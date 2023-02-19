<?php

/**
 * The Media Library controlelr
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div
    x-title="Media Source Manager"
    x-data="MediaLibrary()"
    aria-hidden="true"
    @open-media-source-manager.window="manager.open()"
    x-init="init()"></div>
