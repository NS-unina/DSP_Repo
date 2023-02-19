<?php if (!defined('ABSPATH')) {
die('No direct access.');
} ?>
<div class="row can-inherit title<?php echo esc_attr($inherit_image_title_class); ?>">
    <label><?php esc_html_e("Image Title Text", "ml-slider"); ?></label>
    <div class="input-label right">
        <label class="small" title="<?php esc_attr_e("Enable this to inherit the image title", "ml-slider"); ?>">
            <?php esc_html_e("Use the image title", "ml-slider"); ?> <input autocomplete="off" type="checkbox" class="js-inherit-from-image" name="attachment[<?php echo esc_attr($slide_id); ?>][inherit_image_title]" <?php echo $inherit_image_title_check; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
        </label>
    </div>
    <div class="default"><?php echo $image_title ? esc_html($image_title) : "<span class='no-content'>&nbsp;</span>"; ?></div>
    <input tabindex="0" type="text" size="50" name="attachment[<?php echo esc_attr($slide_id); ?>][title]" value="<?php echo esc_attr($title); ?>">
</div>
<div class="row can-inherit alt<?php echo esc_attr($inherit_image_alt_class); ?>">
    <label><?php esc_html_e("Image Alt Text", "ml-slider"); ?></label>
    <div class="input-label right">
        <label class="small" title="<?php esc_attr_e('Enable this to inherit the image alt text', 'ml-slider'); ?>">
            <?php esc_html_e("Use the image alt text", "ml-slider"); ?> <input autocomplete="off" type="checkbox" class="js-inherit-from-image" name="attachment[<?php echo esc_attr($slide_id); ?>][inherit_image_alt]" <?php echo $inherit_image_alt_check; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
        </label>
    </div>
    <div class="default"><?php echo $image_alt ? esc_html($image_alt) : "<span class='no-content'>&nbsp;</span>"; ?></div>
    <input tabindex="0" type="text" size="50" name="attachment[<?php echo esc_attr($slide_id); ?>][alt]" value="<?php echo esc_attr($alt); ?>">
</div>
