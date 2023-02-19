<?php

/**
 * The top level toolbar
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div class="bg-nord4 text-nord0 px-4 h-12 flex items-center justify-between flex-shrink-0">
    <h1
        class="flex-1 font-medium font-heading text-nord0 whitespace-nowrap text-left"
        :class="{ 'cursor-pointer': $component('settings').fullScreen }"
        @click="$component('settings').updateSetting('fullScreen', false)"
    >MetaGallery</h1>
    <div class="flex-1 flex justify-center">
        <?php require METAGALLERY_PATH . 'resources/views/parts/add-images-button.php'; ?>
    </div>
    <div class="flex-1 flex justify-end items-center">
        <?php require METAGALLERY_PATH . 'resources/views/parts/share-button.php'; ?>
        <?php require METAGALLERY_PATH . 'resources/views/parts/save-button.php'; ?>
        <?php require METAGALLERY_PATH . 'resources/views/parts/right-dropdown.php'; ?>
    </div>
</div>
