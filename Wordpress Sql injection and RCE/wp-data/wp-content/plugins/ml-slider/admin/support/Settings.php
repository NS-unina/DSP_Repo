<?php

if (!defined('ABSPATH')) {
    die('No direct access.');
}

if (! class_exists('MetaSlider_Settings')) {
    /**
     * Class to handle settings for MetaSlider.
     */
    class MetaSlider_Settings
    {
        const GLOBAL_OPTIONS_OPTION_NAME = 'metaslider_global_settings';

        /**
         * Instance object
         *
         * @var MetaSlider_Settings
         * @see get_instance()
         */
        protected static $instance = null;

        public function __construct()
        {
        }

        /**
         * Used to access the instance
         *
         * @return MetaSlider_Settings - class instance
         */
        public static function get_instance()
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }

            return self::$instance;
        }

        private function get_option($option_name, $default = null)
        {
            $settings = get_option(self::GLOBAL_OPTIONS_OPTION_NAME);

            if (false === $settings) {
                return $default;
            }

            if (! isset($settings[$option_name])) {
                return $default;
            }

            return $settings[$option_name];
        }

        /**
         * Return the setting disableExtendify.
         *
         * @return bool
         */
        public function get_disable_extendify_sdk()
        {
            return (bool) $this->get_option('disableExtendify', true);
        }
    }
}
