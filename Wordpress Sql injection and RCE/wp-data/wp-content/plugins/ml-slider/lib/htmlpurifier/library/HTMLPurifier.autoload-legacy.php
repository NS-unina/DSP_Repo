<?php

/**
 * @file
 * Legacy autoloader for systems lacking spl_autoload_register
 *
 * Must be separate to prevent deprecation warning on PHP 7.2
 */

function HTMLPurifier__autoload($class)
{
    return HTMLPurifier_Bootstrap::autoload($class);
}

// vim: et sw=4 sts=4
