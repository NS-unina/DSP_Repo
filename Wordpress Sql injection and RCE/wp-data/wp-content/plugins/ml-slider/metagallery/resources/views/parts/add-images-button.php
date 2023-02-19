<?php

/**
 * The button that says "Add images"
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<div
    x-data="{ open: false, usedKeyboard: false, }"
    class="relative z-30"
    x-title="Add Images Menu"
    @keydown.tab.window="usedKeyboard = true"
    @keydown.escape="open = false"
    @click.away="open = false">
    <button
        @click="open = !open;open && $nextTick(() => $refs.popup.focus())"
        class="mx-auto flex items-center transition duration-250 px-6 py-1 bg-nord15 hover:bg-nord9 text-nord6 hover:text-nord6 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nord4 focus:ring-nord10"
        id="add-images-menu"
        aria-haspopup="true"
        x-bind:aria-expanded="open.toString()">
        <?php esc_html_e('Add images', 'metagallery'); ?>
    </button>
    <div
        x-show="open"
        x-ref="popup"
        tabindex="0"
        x-cloak
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="transform opacity-0 -translate-y-3"
        x-transition:enter-end="transform opacity-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="transform opacity-100"
        x-transition:leave-end="transform opacity-0"
        class="absolute origin-center transform -translate-x-1/2 left-1/2 w-96 mt-3 shadow-xl bg-white ring-1 ring-nord0 ring-opacity-5 arrow-top">
        <div class="p-4 leading-tight" role="menu" aria-orientation="vertical" aria-labelledby="add-images-menu">
            <h4 class="relative mb-4 -top-2 -left-1 text-nord3 text-xs font-medium uppercase tracking-wide">
            <?php esc_html_e('Select image source', 'metagallery'); ?>
            </h4>

            <div class="grid grid-cols-3 gap-2">
                <button
                    @click="open = false;$dispatch('open-media-source-manager')"
                    class="h-16 flex flex-col items-center justify-between hover:opacity-70"
                    :class="{ 'focus:outline-none': !usedKeyboard }">
                    <span class="block w-16 h-16 text-3xl dashicons dashicons-admin-media"></span>
                    <?php esc_html_e('Media Library', 'metagallery'); ?>
                </button>
            </div>
        </div>
    </div>
</div>
