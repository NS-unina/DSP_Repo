<?php

if (!defined('ABSPATH')) {
    die('No direct access.');
}

if (!class_exists('ExtendifyMetaGallery')) :
    // phpcs:disable
    // Squiz.Classes.ClassFileName.NoMatch
    /**
     * The MetaGallery class
     */
    final class ExtendifyMetaGallery
    {
        // phpcs:enable

        /**
         * Var to make sure we only load once
         *
         * @var boolean $loaded
         */
        public static $loaded = false;

        /**
         * Set up the plugin
         *
         * @return void
         */
        public function __invoke()
        {
            // TODO: Maybe load an "upgrade your PHP" page instead?
            if (version_compare(PHP_VERSION, '5.6', '<') || version_compare($GLOBALS['wp_version'], '5.5', '<')) {
                return;
            }

            if (!self::$loaded) {
                self::$loaded = true;
                require dirname(__FILE__) . '/bootstrap.php';
                $app = new Extendify\MetaGallery\App();
                $shortcode = new Extendify\MetaGallery\Shortcode();
                if (!defined('METAGALLERY_BASE_URL')) {
                    define('METAGALLERY_BASE_URL', plugin_dir_url($app::$textDomain));
                }
            }
        }
        // phpcs:ignore Squiz.Classes.ClassDeclaration.SpaceBeforeCloseBrace
    }

endif;

$metagallery = new ExtendifyMetaGallery();
$metagallery();
