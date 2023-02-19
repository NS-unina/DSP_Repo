<?php

/**
 * The single page view
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div
    x-title="Images"
    x-data="Gallery()"
    x-id="theGallery"
    @metagallery-images-added.window="addImages($event.detail.images)"
    @metagallery-images-removed.window="removeImages($event.detail.images)"
    @reset-layout.window="window.metagalleryGrid.refreshItems().layout(true)"
    @load.window="init()"
    :style="containerStyles"
    class="text-center flex-grow flex relative z-0 p-4 py-8 shadow-inner overflow-scroll">
    <div
        :id="`metagallery-grid-${$component('current').data.ID}`"
        class="relative w-full mb-60">
        <!-- Grid container -->
    </div>
    <template x-if="!$component('current').images.length">
        <div class="absolute inset-0 flex items-center justify-center font-heading text-6xl text-nord4 mx-auto transform pointer-events-none">
            MetaGallery
        </div>
    </template>
</div>
