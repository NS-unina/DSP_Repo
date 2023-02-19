<?php

/**
 * @file
 * Convenience file that registers autoload handler for HTML Purifier.
 * It also does some sanity checks.
 */

if (function_exists('spl_autoload_register') && function_exists('spl_autoload_unregister')) {
    // We need unregister for our pre-registering functionality
    HTMLPurifier_Bootstrap::registerAutoload();
    if (function_exists('HTMLPurifier__autoload')) {
        // Be polite and ensure that userland autoload gets retained
        spl_autoload_register('HTMLPurifier__autoload');
    }
} elseif (!function_exists('HTMLPurifier__autoload')) {
    require dirname(__FILE__) . '/HTMLPurifier.autoload-legacy.php';
}

if (ini_get('zend.ze1_compatibility_mode')) {
    trigger_error("HTML Purifier is not compatible with zend.ze1_compatibility_mode; please turn it off", E_USER_ERROR);
}

// vim: et sw=4 sts=4
