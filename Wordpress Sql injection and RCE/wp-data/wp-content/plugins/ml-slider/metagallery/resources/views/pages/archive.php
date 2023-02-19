<?php

/**
 * The archive page view
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div class="my-20 mx-auto max-w-screen-md px-6 flex items-center justify-center">
    <?php require METAGALLERY_PATH . 'resources/views/parts/create-gallery-simple.php'; ?>
</div>
<div class="flex flex-col p-6 justify-center">
    <h2 class="text-nord3 text-xs font-medium uppercase tracking-wide">
        <?php \esc_html_e('Your Galleries', 'metagallery'); ?>
    </h2>
    <ul class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($data['galleries'] as $metagalleryKey => $metagalleryGallery) { ?>
        <?php $metagalleryTitle = \esc_textarea($metagalleryGallery->meta['title']); ?>
        <?php $metagalleryColor = (15 - ($metagalleryKey % 8)); ?>
        <li class="col-span-1">
            <a class="group flex shadow-sm rounded-md text-nord2"
                href="<?php echo \esc_url(\admin_url('admin.php?page=' . METAGALLERY_PAGE_NAME . '&route=single&gallery=' . $metagalleryGallery->ID)); ?>">
                <div class="flex-shrink-0 flex items-center justify-center w-16 bg-nord<?php echo \esc_attr($metagalleryColor); ?> text-nord6 text-sm font-medium rounded-l-md">

                </div>
                <div class="flex-1 flex items-center justify-between bg-nord4 group-hover:bg-nord2 group-hover:text-nord6 transition duration-200 rounded-r-md truncate h-16">
                    <div class="flex-1 px-4 py-2 text-sm truncate">
                        <span class="font-medium">
                            <?php echo $metagalleryTitle ? \esc_html($metagalleryTitle) : \esc_html__('Title not set', 'metagallery'); ?>
                        </span>
                        <p class="transition duration-200 text-nord3 text-xs group-hover:text-nord6">
                            <?php
                                // translators: %s is replaced with post ID.
                                printf(esc_html__('Gallery ID #%s', 'metagallery'), intval($metagalleryGallery->ID));
                            ?>
                        </p>
                    </div>
                </div>
            </a>
        </li>
        <?php
    }//end foreach
    ?>
    </ul>
</div>
