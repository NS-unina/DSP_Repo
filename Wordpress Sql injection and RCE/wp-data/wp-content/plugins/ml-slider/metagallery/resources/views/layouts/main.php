<?php

/**
 * The main layout view
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div
    id="metagallery-app"
    x-title="Main Wrapper"
    x-data="{
        lastRefresh: Date.now(),
        get adminBarHeight() { return document.getElementById('wpadminbar').scrollHeight }
    }"
    class="metagallery-allowed z-high bg-nord6 font-body inset-0 text-base w-full flex flex-col overflow-hidden"
    :style="`min-height:calc(100vh - ${adminBarHeight}px)`"
    @resize.window.debounce.200="lastRefresh = Date.now()"
    :class="{ 'md:fixed' : $component('settings').fullScreen }">

    <?php require METAGALLERY_PATH . 'resources/views/toolbar.php'; ?>
    <?php require METAGALLERY_PATH . 'resources/views/toolbar2.php'; ?>

    <?php
    if ($view) {
        include METAGALLERY_PATH . "resources/views/pages/{$view}.php";
    }
    ?>

    <?php require METAGALLERY_PATH . 'resources/views/settings/gallery-settings.php'; ?>
    <?php require METAGALLERY_PATH . 'resources/views/settings/image-settings.php'; ?>
</div>

<div x-data x-title="State Management" aria-hidden="true">
    <?php require METAGALLERY_PATH . 'resources/views/state/editor-settings.php'; ?>
    <?php require METAGALLERY_PATH . 'resources/views/state/current.php'; ?>
</div>
<?php
    require METAGALLERY_PATH . 'resources/views/sources/mediaLibrary.php';
    require METAGALLERY_PATH . 'resources/views/parts/modal.php';
