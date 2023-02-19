<?php if (!defined('ABSPATH')) {
    die('No direct access.');
} ?>

<div class="updraft-ad-container ml-discount-ad notice updated">
    <div class="updraft_notice_container">
        <div class="updraft_advert_content_left">
            <img src="<?php echo esc_url(METASLIDER_BASE_URL . 'admin/images/' . $image);?>" width="60" height="60" alt="<?php esc_attr_e('Logo', 'ml-slider');?>" />
        </div>
        <div class="updraft_advert_content_right">
            <div class="ml-discount-ad-title">
                <?php
                echo esc_html($title);
                if (!empty($button_link)) {
                    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    echo $this->get_button_link($button_link, $button_meta);
                }
                ?>
            </div>
            <div class="updraft-advert-dismiss">
                <a class="underline text-blue-dark" href="#" onclick="jQuery('.updraft-ad-container').slideUp(); jQuery.post(ajaxurl, {action: 'notice_handler', ad_identifier: '<?php echo esc_js($dismiss_time);?>', _wpnonce: metaslider_notices_handle_notices_nonce });"><?php echo sprintf('%s', esc_html__('Dismiss', 'ml-slider'));
echo ('' !== $hide_time) ? esc_html(sprintf(' (%s)', $hide_time)) : ''; ?></a>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
