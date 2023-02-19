<?php

/**
 * The right side settings area
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<section
    x-title="Gallery Settings"
    x-cloak
    x-data="{
        open: false,
        usedKeyboard: false,
        init() {
            this.$watch('open', value => {
                value && this.$refs.closeButton.focus()
            })
        },
    }"
    x-cloak
    @open-menu.window="open = $event.detail.open"
    @keydown.window.tab="usedKeyboard = true"
    @keydown.escape="open = false"
    :aria-hidden="open.toString()"
    x-init="init()">
    <div
        class="fixed transition duration-300 right-0 top-0 transform w-full max-w-xs h-screen z-max bg-white overflow-hidden"
        :class="{
            'translate-x-full': !open,
            'shadow-2xl': open,
        }">
        <button
            @click="open = false"
            x-ref="closeButton"
            type="button"
            :class="{'focus:outline-none': !usedKeyboard}"
            class="fixed top-0 right-0 z-50 w-7 h-7 m-1 text-nord3">
            <span class="sr-only"><?php \esc_html_e('Close', 'metagallery'); ?></span>
            <svg class="block stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="pt-2 pl-2 pr-10 pb-10 absolute top-0 h-full w-full overflow-y-scroll">
            <?php require METAGALLERY_PATH . 'resources/views/parts/save-button.php'; ?>
            <h2 class="text-nord3 mt-6 mb-2 text-xs font-medium uppercase tracking-wide">
                <?php \esc_html_e('Gallery Settings', 'metagallery'); ?>
            </h2>
            <div>
                <?php require METAGALLERY_PATH . 'resources/views/parts/notice-in-settings.php'; ?>
                <div class="text-sm leading-none mb-4">
                    <label for="image-max-width" class="font-medium mb-1 block text-nord0">
                        <?php \esc_html_e('Image width (%)', 'metagallery'); ?>
                    </label>
                    <div class="mt-1">
                        <input
                            type="number"
                            :value="$component('current').settings.percentImageWidth"
                            @input.debounce.100="$component('current').updateSetting('percentImageWidth', $event.target.value)"
                            name="image-max-width"
                            id="image-max-width"
                            class="shadow-sm focus:ring-nord9 focus:border-nord9 block w-full sm:text-sm border-nord3 rounded-md">
                    </div>
                </div>
                <div class="text-sm leading-none mb-4">
                    <label for="image-max-width" class="font-medium mb-1 block text-nord0">
                        <?php \esc_html_e('Image max width (px)', 'metagallery'); ?>
                    </label>
                    <div class="mt-1">
                        <input
                            type="number"
                            :value="$component('current').settings.maxImageWidth"
                            @input.debounce.100="$component('current').updateSetting('maxImageWidth', $event.target.value)"
                            name="image-max-width"
                            id="image-max-width"
                            class="shadow-sm focus:ring-nord9 focus:border-nord9 block w-full sm:text-sm border-nord3 rounded-md">
                    </div>
                </div>
                <div class="text-sm leading-none mb-4">
                    <label for="image-min-width" class="font-medium mb-1 block text-nord0">
                        <?php \esc_html_e('Image min width (px)', 'metagallery'); ?>
                    </label>
                    <div class="mt-1">
                        <input
                            type="number"
                            :value="$component('current').settings.minImageWidth"
                            @input.debounce.100="$component('current').updateSetting('minImageWidth', $event.target.value)"
                            name="image-max-width"
                            id="image-max-width"
                            class="shadow-sm focus:ring-nord9 focus:border-nord9 block w-full sm:text-sm border-nord3 rounded-md">
                    </div>
                </div>
                <div class="text-sm leading-none mb-4">
                    <label for="image-max-width" class="font-medium mb-1 block text-nord0">
                        <?php \esc_html_e('Spacing (px)', 'metagallery'); ?>
                    </label>
                    <div class="mt-1">
                        <input
                            type="number"
                            :value="$component('current').settings.imageSpacing"
                            @input.debounce.100="$component('current').updateSetting('imageSpacing', $event.target.value)"
                            name="image-max-width"
                            id="image-max-width"
                            class="shadow-sm focus:ring-nord9 focus:border-nord9 block w-full sm:text-sm border-nord3 rounded-md">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button
        x-show.transition.opacity.duration.300="$component('current').images.length"
        x-cloak
        class="fixed h-10 right-0 top-28 w-10 focus:outline-none p-1.5 rounded-l-lg bg-white shadow-md text-nord7 transition duration-250"
        :class="{ 'focus:ring': usedKeyboard }"
        @click="open = !open">
        <span class="sr-only"><?php \esc_html_e('Open Settings', 'metagallery'); ?></span>
        <svg class="block stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </button>
</section>
