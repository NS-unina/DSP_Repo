<?php

/**
 * Admin page router.
 */

namespace Extendify\MetaGallery;

use Extendify\MetaGallery\App;
use Extendify\MetaGallery\Traits\Routable;

/**
 * This file acts as a router for pages within the specific admin page.
 *
 * @since 0.1.0
 */
class AdminRouter
{
    use Routable;

    /**
     * The parent page
     *
     * @var $parent
     */
    protected $parent = '';

    /**
     * The routes
     *
     * @var $routes
     */
    public $routes = [];

    /**
     * Adds various actions to set up the page
     *
     * @since 0.1.0
     * @return void
     */
    public function __construct()
    {
        if (self::$instance) {
            return self::$instance;
        }

        self::$instance = $this;
        $this->addBasePageAndLoadScripts();
    }

    /**
     * The get handler.
     *
     * @param string $namespace - The namespace.
     * @param string $endpoint  - The route endpoint.
     * @param mixed  $callback  - The callback function.
     *
     * @return void
     */
    public function getHandler($namespace, $endpoint, $callback)
    {
        // Convert Object::class to [Object::class, ''] to match [Object, method].
        if (is_string($callback)) {
            $callback = [
                $callback,
                '',
            ];
        }

        $this->routes['GET'][$endpoint . $namespace] = $callback;
    }

    /**
     * The post handler.
     *
     * @param string $namespace - The namespace.
     * @param string $endpoint  - The route endpoint.
     * @param mixed  $callback  - The callback function.
     *
     * @return void
     */
    public function postHandler($namespace, $endpoint, $callback)
    {
        // Convert Object::class to [Object::class, ''] to match [Object, method].
        if (is_string($callback)) {
            $callback = [
                $callback,
                '',
            ];
        }

        $this->routes['POST'][$endpoint . $namespace] = $callback;
    }

    /**
     * Put route handler
     *
     * @param string $namespace - The api name space.
     * @param string $endpoint  - The endpoint.
     * @param string $callback  - The callback to run.
     *
     * @return void
     */
    public function putHandler($namespace, $endpoint, $callback)
    {
    }

    /**
     * The route handler.
     *
     * @return void
     */
    public function registerHandler()
    {
        if (!$this->checkAdminPageIsOurs()) {
            return;
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if (!isset($_SERVER['REQUEST_METHOD']) || !isset($_GET['route'])) {
            $redirect = add_query_arg(
                [
                    'page' => METAGALLERY_PAGE_NAME,
                    'route' => 'archive'
                ],
                \admin_url('admin.php')
            );
            \wp_safe_redirect($redirect);
            exit;
        }

        // Create a REST reqquest object for simplicity.
        $request = new \WP_REST_Request(
            \sanitize_text_field(\wp_unslash($_SERVER['REQUEST_METHOD'])),
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            \esc_url(\admin_url('admin.php?page=' . METAGALLERY_PAGE_NAME . '&route=' . \sanitize_text_field(\wp_unslash($_GET['route']))))
        );
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended,WordPress.Security.NonceVerification.Missing
        $request->set_body_params($request->get_method() === 'GET' ? $_GET : $_POST);

        // If this is a POST request, look for the nonce and verify it (also check capability).
        if ($request->get_method() === 'POST') {
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended,Generic.PHP.DisallowRequestSuperglobal.Found
            if (!isset($_REQUEST['HTTP_X_WP_NONCE'])) {
                \wp_die(\esc_html__('You do not have permission to do that.', 'metagallery'));
            }

            // phpcs:ignore WordPress.Security.NonceVerification.Recommended,Generic.PHP.DisallowRequestSuperglobal.Found
            if (!$this->doubleCheckPermission(sanitize_text_field(wp_unslash($_REQUEST['HTTP_X_WP_NONCE'])))) {
                \wp_die(\esc_html__('You do not have permission to do that.', 'metagallery'));
            }
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $callback = $this->routes[$request->get_method()][\sanitize_text_field(\wp_unslash($_GET['route']))];

        // The route must be registered.
        if ($callback) {
            if (is_array($callback) && class_exists($callback[0])) {
                $class = new $callback[0]();
                if (method_exists($class, $callback[1])) {
                    return call_user_func_array(
                        [
                            $class,
                            $callback[1],
                        ],
                        [$request]
                    );
                }
            }
        }

        // Default to archive page.
        $redirect = add_query_arg(
            [
                'page' => METAGALLERY_PAGE_NAME,
                'route' => 'archive'
            ],
            \admin_url('admin.php')
        );
        \wp_safe_redirect($redirect);
        exit;
    }

    /**
     * Adds the main admin page
     *
     * @since 0.1.0
     * @return void
     */
    public function addBasePageAndLoadScripts()
    {
        \add_action(
            'admin_menu',
            function () {
                $this->addAdminPage();
            },
            9999
        );

        \add_action(
            'init',
            function () {
                // First, unload textdomain - Based on https://core.trac.wordpress.org/ticket/34213#comment:26
                unload_textdomain('metagallery');

                // Call the core translations from plugins languages/ folder
                if (file_exists(__DIR__ . '/../languages/' . 'metagallery' . '-' . get_locale() . '.mo')) {
                    load_textdomain(
                        'metagallery',
                        __DIR__ . '/../languages/' . 'metagallery' . '-' . get_locale() . '.mo'
                    );
                }
            }
        );

        \add_action(
            'admin_enqueue_scripts',
            function ($hook) {
                $this->addGlobalScriptsAndStyles();
                if (!$this->checkAdminPageIsOurs($hook)) {
                    return;
                }

                $this->addScopedScriptsAndStyles();
            }
        );

        \add_action(
            'admin_head',
            function () {
                $this->addGlobalInlineScripts();
                if (!$this->checkAdminPageIsOurs()) {
                    return;
                }

                $this->addScopedInlineScripts();
            }
        );
    }

    /**
     * Lets sideloading as a subpage from another plugin
     *
     * @since 0.1.0
     * @param string $page - The parent page.
     *
     * @return self
     */
    public function sideload($page)
    {
        $this->parent = $page;
        return $this;
    }


    /**
     * Adds the main admin page
     *
     * @since 0.1.0
     * @return void
     */
    public function addAdminPage()
    {
        $addPage = $this->parent ? '\add_submenu_page' : '\add_menu_page';
        $args = [
            App::$name,
            __('Gallery', 'metagallery'),
            App::$capability,
            App::$slug,
            '\Extendify\MetaGallery\View::admin',
        ];
        if ($this->parent) {
            array_unshift($args, $this->parent);
        }

        $addPage(...$args);
    }

    /**
     * Double checks the user has permission
     *
     * @since 0.1.0
     * @param string $nonce - The nonce.
     *
     * @return boolean
     */
    public function doubleCheckPermission($nonce)
    {
        // Check for the nonce on the server (used by WP REST).
        return \wp_verify_nonce($nonce, 'wp_metagallery') && \current_user_can(App::$capability);
    }

    /**
     * Makes sure we are on the correct page
     *
     * @since 0.1.0
     * @param string $hook - An optional hook provided by WP to identify the page.
     * @return boolean
     */
    public function checkAdminPageIsOurs($hook = '')
    {
        if ($hook) {
            return stripos($hook, App::$slug) > -1;
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        return isset($_GET['page']) && (\sanitize_text_field(\wp_unslash($_GET['page'])) === METAGALLERY_PAGE_NAME);
    }

    /**
     * Adds various JS scripts
     *
     * @since 0.1.0
     * @return void
     */
    public function addScopedScriptsAndStyles()
    {
        \wp_enqueue_media();

        \wp_register_script(
            App::$slug . '-scripts',
            METAGALLERY_BASE_URL . 'public/build/metagallery.js',
            ['wp-i18n'],
            App::$version,
            true
        );
        \wp_localize_script(
            App::$slug . '-scripts',
            App::$slug . 'Data',
            [
                'root' => \esc_url_raw(rest_url(APP::$slug . '/' . APP::$apiVersion)),
                'nonce' => \wp_create_nonce('wp_rest'),
            ]
        );
        \wp_enqueue_script(App::$slug . '-scripts');

        if (function_exists('wp_set_script_translations')) {
            \wp_set_script_translations(App::$slug . '-scripts', App::$textDomain, __DIR__ . '/../languages');
        }

        \wp_enqueue_style(
            App::$slug . '-theme',
            METAGALLERY_BASE_URL . 'public/build/theme.css',
            [],
            App::$version,
            'all'
        );
    }

    /**
    * Adds various inline JS/CSS scripts directly to the head
    *
    * @since 0.1.0
    * @return void
    */
    public function addScopedInlineScripts()
    {
        // helper style for Alpinejs.
        // phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet
        echo '<style>[x-cloak] { display: none!important; }</style>';
    }

    /**
     * Adds various JS scripts to EVERY admin page
     *
     * @since 0.1.0
     * @return void
     */
    public function addGlobalScriptsAndStyles()
    {
        // phpcs:disable
        // \wp_enqueue_script(
        //     App::$slug . '-alpine',
        //     'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
        //     [],
        //     App::$version,
        //     true
        // );
        // phpcs:enable
    }

    /**
     * Adds various inline JS/CSS scripts directly to the head on EVERY admin page
     *
     * @since 0.1.0
     * @return void
     */
    public function addGlobalInlineScripts()
    {
        ?>
        <style>
            @font-face {
              font-family: 'Rubik';
              src: url('<?php echo METAGALLERY_BASE_URL."resources/fonts/"; ?>Rubik.ttf') format('truetype');
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              src: url('<?php echo METAGALLERY_BASE_URL."resources/fonts/"; ?>IBMPlexSans-Regular.ttf') format('truetype');
            }
            .wp-has-submenu a[href="admin.php?page=metagallery"] {
                margin-top: 10px !important;
            }
            .wp-has-submenu a[href="admin.php?page=metagallery"]::after {
                content: 'BETA';
                font-size: 10px;
                margin-left: 5px;
                color: #dfff34;
            }
        </style>
        <?php
    }
}
