<?php

/**
 * The share button
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
    <button
        x-data="{
            shortcode: `[metagallery id=${$component('current').data.ID}]`,
        }"
        x-show.transition.opacity.duration.300="$component('current').images.length"
        class="text-sm font-medium text-nord3 mr-4 px-2 focus:ring focus:outline-none"
        x-cloak
        @click="$dispatch('open-modal', {
            type: 'info',
            headline: '<?php \esc_attr_e('Add to page/post', 'metagallery'); ?>',
            content: `<div class='text-lg mt-2 text-nord11'>${shortcode}</div>
                <p><?php \esc_html_e('Copy the shortcode and insert it on your page using a shortcode block or otherwise an html block.', 'metagallery'); ?></p>
            `,
            source: $el.__x.$data,
            action: function() {
                $clipboard(shortcode);
                $dispatch('open-modal', { actionLabel: '<?php \esc_attr_e('Copied!', 'metagallery'); ?>' });
                setTimeout(() => { $dispatch('close-modal') }, 500) },
            actionLabel: '<?php \esc_attr_e('Copy', 'metagallery'); ?>',
            secondaryActionLabel: 0
        })">
        <?php \esc_html_e('Add to page', 'metagallery'); ?>
    </button>
