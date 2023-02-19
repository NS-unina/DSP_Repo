<?php

/**
 * The right three dot menu dropdown
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<div
    x-data="{ open: false, usedKeyboard: false }"
    x-id="editor-settings"
    x-title="Editor Settings"
    @keydown.escape="open = false"
    @click.away="open = false"
    @keydown.window.tab="usedKeyboard = true"
    class="relative inline-block text-left">
    <div>
        <button
            @click="open = !open"
            class="bg-transparent rounded-full flex items-center hover:text-nord9 focus:text-nord0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nord4 focus:ring-nord9"
            id="options-menu"
            aria-haspopup="true"
            x-bind:aria-expanded="open.toString()">
            <span class="sr-only"><?php \esc_html_e('Open options', 'metagallery'); ?></span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
        </button>
    </div>
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-out duration-100"
        x-transition:enter-start="transform opacity-0 scale-95"
        x-transition:enter-end="transform opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="transform opacity-100 scale-100"
        x-transition:leave-end="transform opacity-0 scale-95"
        class="origin-top-right absolute z-10 right-0 mt-2 w-72 shadow-lg bg-white ring-1 ring-nord0 ring-opacity-5">
        <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            x-title="Options Menu">
            <div
                class="h-12 relative flex cursor-pointer py-2 px-4 hover:bg-nord6"
                :class="{ 'focus:ring': usedKeyboard }"
                role="checkbox"
                tabindex="0"
                @click="$component('settings').updateSetting('fullScreen', !$refs.fullScreen.checked)">
                <div class="flex items-center justify-center w-5">
                    <input
                        tabindex="-1"
                        x-ref="fullScreen"
                        x-model="$component('settings').fullScreen"
                        @click.stop="$component('settings').updateSetting('fullScreen', $refs.fullScreen.checked)"
                        name="fullScreen"
                        type="checkbox"
                        class="focus:ring-nord9 h-4 w-4 text-nord9 border-nord3 rounded">
                </div>
                <div class="ml-2 text-sm leading-none">
                    <label for="fullScreen" class="font-medium mb-1 block text-nord0">
                    <?php \esc_html_e('Fullscreen mode', 'metagallery'); ?>
                    </label>
                    <p class="text-nord3 text-xs">
                        <?php \esc_html_e('Work without distraction', 'metagallery'); ?>
                    </p>
                </div>
            </div>
            <div class="h-12 relative flex cursor-pointer py-2 px-4 hover:bg-nord6">
                <div class="flex items-center justify-center w-5">
                    <!-- <input
                        x-ref="theme"
                        x-model="$component('settings').theme"
                        @click.stop="$component('settings').updateSetting('theme', $refs.theme.checked ? 'dark' : 'light')"
                        name="theme"
                        type="checkbox"
                        class="focus:ring-nord9 h-4 w-4 text-nord9 border-nord3 rounded"> -->
                </div>
                <div class="ml-2 text-sm leading-none">
                    <label for="theme" class="font-medium mb-1 block text-nord0">
                        <?php \esc_html_e('Dark mode', 'metagallery'); ?>
                    </label>
                    <p class="text-nord3 text-xs italic">
                        <?php \esc_html_e('Coming soon', 'metagallery'); ?>
                    </p>
                </div>
            </div>
            <div
                x-title="Background Color"
                class="h-12 relative flex cursor-pointer py-2 px-4 hover:bg-nord6">
                <div class="flex items-center justify-center w-5">
                    <!-- Add color picker here -->
                </div>
                <div class="ml-2 text-sm leading-none">
                    <label for="bgcolor" class="font-medium mb-1 block text-nord0">
                    <?php \esc_html_e('Background color', 'metagallery'); ?>
                    </label>
                    <p class="text-nord3 text-xs italic">
                        <?php \esc_html_e('Coming soon', 'metagallery'); ?>
                    </p>
                </div>
            </div>
            <hr class="mt-4">
            <?php require METAGALLERY_PATH . 'resources/views/parts/delete-button.php'; ?>
        </div>
    </div>
</div>
