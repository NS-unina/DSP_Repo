<?php

/**
 * The App details file
 */

namespace Extendify\MetaGallery;

/**
 * Controller for handling various app data
 *
 * @since 0.1.0
 */
class App
{
    /**
     * Plugin name
     *
     * @since 0.1.0
     * @var string
     */
    public static $name = '';

    /**
     * Plugin slug
     *
     * @since 0.1.0
     * @var string
     */
    public static $slug = '';

    /**
     * Plugin version
     *
     * @since 0.1.0
     * @var string
     */
    public static $version = '';

    /**
     * Plugin API REST version
     *
     * @since 0.1.0
     * @var string
     */
    public static $apiVersion = 'v1';

    /**
     * Plugin default capability
     *
     * @since 0.1.0
     * @var string
     */
    public static $capability = 'manage_options';

    /**
     * Plugin text domain
     *
     * @since 0.1.0
     * @var string
     */
    public static $textDomain = '';

    /**
     * Process the readme file to get version and name
     *
     * @since 0.1.0
     * @return void
     */
    public function __construct()
    {
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        self::$capability = \apply_filters('metagallery_capability', self::$capability);

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        $readme = file_get_contents(dirname(__DIR__) . '/readme.txt');

        preg_match('/=== (.+) ===/', $readme, $matches);
        self::$name = $matches[1];
        self::$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', self::$name), '-'));

        preg_match('/Stable tag: ([0-9.:]+)/', $readme, $matches);
        self::$version = $matches[1];

        // TODO: Remove this call for improving performance.
        self::$textDomain = $this->getPluginInfo('TextDomain');

        if (empty(self::$textDomain)) {
            self::$textDomain = 'metagallery';
        }
    }

    /**
     * Will return an instance of a controller on demand
     * Example: App::get('UserData')
     *
     * @since 0.1.0
     * @param string $name      - The name of the method being called.
     * @param string $arguments - On enumerated array containing the parameters passed to the $name'ed method.
     * @return object
     */
    public static function __callStatic($name, $arguments)
    {
        if ($name !== 'get') {
            return;
        }

        if (file_exists(dirname(__FILE__) . "/Controllers/{$arguments[0]}Controller.php")) {
            $controller = 'Extendify\MetaGallery\\Controllers\\' . $arguments[0] . 'Controller';
            return new $controller();
        }
    }

    /**
     * Will return an instance of a controller on demand
     * Example: App::get('UserData')
     *
     * @since 0.1.0
     * @param string $identifier The key of the plugin info.
     * @return string
     */
    protected function getPluginInfo($identifier)
    {
        if (!function_exists('get_plugins')) {
            include_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        foreach (get_plugins() as $plugin => $data) {
            if ($data[$identifier] === self::$slug) {
                return $plugin;
            }
        }

        return false;
    }
}
