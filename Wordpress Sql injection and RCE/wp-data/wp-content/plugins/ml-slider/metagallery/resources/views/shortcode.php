<?php

/**
 * The shortcode output view
 * This should eventually be split into multiple
 * different template files instead of one omni file
 * Keep it simple for now though. Migrate it when needed.
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>

<?php
$metagallery = isset($data[0]->meta) ? $data[0]->meta : [];
// This is temporary and eventually I want to impliment a better image library.
// I don't think it's wise to rely on WP long term as many other plugins interact.
// Or maybe we keep it simple and run EVERYTHING through WP.
if (isset($metagallery['images'])) {
    // Settings with defaults. Could probably start extracting to a helper class. Maybe remove the ";" too.
    $metagalleryMaxWidth = isset($metagallery['settings']['maxImageWidth']) ? $metagallery['settings']['maxImageWidth'] : 'full';
    $metagalleryMaxWidthInline = isset($metagallery['settings']['maxImageWidth']) ? $metagallery['settings']['maxImageWidth'] . 'px;' : 'auto;';
    $metagalleryMinWidthInline = isset($metagallery['settings']['minImageWidth']) ? $metagallery['settings']['minImageWidth'] . 'px;' : 'auto;';
    $metagalleryWidthInline = isset($metagallery['settings']['percentImageWidth']) ? $metagallery['settings']['percentImageWidth'] . '%;' : '100%;';
    $metagalleryImageSpacing = isset($metagallery['settings']['imageSpacing']) ? $metagallery['settings']['imageSpacing'] . 'px;' : '0;';
    $metagalleryImageSpacingDoubled = isset($metagallery['settings']['imageSpacing']) ? (intval($metagallery['settings']['imageSpacing']) * 2) . 'px' : '0;'; ?>
    <div class="metagallery-wrapper">
        <div
            id="metagallery-<?php echo \esc_attr($data[0]->ID); ?>"
            style="position:relative!important;width:calc(100% + <?php echo \esc_attr($metagalleryImageSpacingDoubled); ?>)!important;<?php echo 'margin:-' . \esc_attr($metagalleryImageSpacing); ?>">
        <?php

        foreach ($metagallery['images'] as $metagalleryImage) {
            if (!isset($metagalleryImage['WP']['id'])) {
                continue;
            }

            $metagalleryImageIdWP = $metagalleryImage['WP']['id'];
            if (get_post_type($metagalleryImageIdWP) !== 'attachment') {
                // Likely the image was deleted. Maybe we can set a state for this?
                continue;
            } ?>
                <div
                    style="display:block!important;position:absolute!important;
                    <?php
                        echo 'min-width:' . \esc_attr($metagalleryMinWidthInline) .
                        'width:' . \esc_attr($metagalleryWidthInline); ?>"
                    >
                    <div style="position:relative!important;max-width:100%!important;width:100%!important;height:100%!important;">
                        <div style="
                            max-width:
                            <?php
                            echo \esc_attr($metagalleryMaxWidthInline) .
                            'min-width:' . \esc_attr($metagalleryMinWidthInline) .
                            'padding:' . \esc_attr($metagalleryImageSpacing); ?>">
                            <?php echo \wp_get_attachment_image($metagalleryImageIdWP, $metagalleryMaxWidth, false, ['alt' => \esc_attr($metagalleryImage['alt'])]); ?>
                        </div>
                    </div>
                </div>
            <?php
        }//end foreach?>
        </div>
    </div>
    <?php
}//end if
