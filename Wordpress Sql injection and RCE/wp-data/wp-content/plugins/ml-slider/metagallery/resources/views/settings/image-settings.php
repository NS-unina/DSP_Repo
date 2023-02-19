<?php

/**
 * The right side image settings area
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<section
    x-title="Image Settings"
    x-cloak
    x-data="{
        open: false,
        imageId: null,
        image: null,
        usedKeyboard: false,
        toggleOpen(id) {
            if (id == this.imageId) {
                this.open = false
                setTimeout(() => {
                    this.imageId = null
                }, 300)
                return
            }
            this.imageId = id
            this.open = true
        },
        init() {
            this.$watch('open', value => {
                value && this.$refs.closeButton.focus()
            })
            this.$watch('imageId', value => {
                if (!value) {
                    this.image = null
                }
                this.image = this.$component('current').images.filter(i => i._uid == value)[0]
            })
        },
    }"
    x-cloak
    x-id="image-settings"
    @open-image-settings.window="toggleOpen($event.detail.image)"
    @keydown.window.tab="usedKeyboard = true"
    @keydown.escape="open = false;setTimeout(() => { imageId = null }, 300)"
    :aria-hidden="open.toString()"
    x-init="init()">
    <div
        class="fixed transition duration-300 right-0 top-0 transform w-full max-w-xs h-screen z-max bg-white overflow-hidden"
        :class="{
            'translate-x-full': !open,
            'shadow-2xl': open,
        }">
        <button
            @click="open = false;setTimeout(() => { imageId = null }, 300)"
            x-ref="closeButton"
            type="button"
            :class="{'focus:outline-none': !usedKeyboard}"
            class="fixed top-0 right-0 z-50 w-7 h-7 m-1 text-nord3">
            <span class="sr-only"><?php \esc_html_e('Close', 'metagallery'); ?></span>
            <svg class="block stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="flex flex-col p-2 absolute top-0 h-full w-full">
            <div>
                <?php require METAGALLERY_PATH . 'resources/views/parts/save-button.php'; ?>
            </div>
            <h2 class="text-nord3 mt-6 mb-2 text-xs font-medium uppercase tracking-wide">
                <?php \esc_html_e('Image Settings', 'metagallery'); ?>
            </h2>
            <div class="flex flex-col justify-between flex-grow overflow-hidden">
                <div class="overflow-y-scroll pb-20 pr-10">
                    <?php require METAGALLERY_PATH . 'resources/views/parts/notice-in-settings.php'; ?>
                    <template x-if="image">
                        <div class="mb-6 mx-auto">
                            <img class="border-0" :src="image.src.thumbnail.url" alt="">
                        </div>
                    </template>
                    <div class="text-sm leading-none mb-4">
                        <label for="image-alt-attribute" class="font-medium mb-1 block text-nord0">
                            <?php \esc_html_e('Image alt attribute', 'metagallery'); ?>
                        </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                :value="image?.alt"
                                @input.debounce.500="$component('current').updateImageSetting(imageId, 'alt', $event.target.value)"
                                name="image-alt-attribute"
                                id="image-alt-attribute"
                                class="shadow-sm focus:ring-nord9 focus:border-nord9 block w-full sm:text-sm border-nord3 rounded-md">
                        </div>
                    </div>
                </div>
                <div class="absolute w-full bottom-0 left-0 bg-white flex items-center justify-center p-2">
                    <button
                        @click="open = false;setTimeout(() => {
                            $dispatch('metagallery-images-removed', { images: [imageId] })
                            imageId = null
                        }, 300)"
                        class="mr-4 px-6 py-1 bg-nord11 text-white shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nord4 focus:ring-nord11"
                        title="<?php \esc_attr_e('Remove image from gallery', 'metagallery'); ?>">
                        <?php \esc_html_e('Remove image', 'metagallery'); ?>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
