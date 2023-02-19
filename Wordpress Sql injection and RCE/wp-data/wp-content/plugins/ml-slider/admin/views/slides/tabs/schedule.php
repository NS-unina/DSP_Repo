<?php if (!defined('ABSPATH')) {
die('No direct access.');
} ?>
<div class="schedule_placeholder">
    <?php if (metaslider_pro_is_installed()) : ?>
        <p style="mb-0 text-base"><?php esc_html_e('Update or activate your pro add-on pack now to add a start/end date option to your slides', 'ml-slider'); ?></p>
        <p><?php printf(esc_html_x('Have an expired license? Use coupon code %s for a %s discount', 'A coupon code and a discount amount', 'ml-slider'), '<strong>unlockscheduling</strong>', '50%'); ?></p>
        <a href="https://www.metaslider.com/documentation/i-have-the-pro-add-on-pack-why-isnt-this-feature-working" class="button button-primary" target="_blank"><?php esc_html_e('Why am I seeing this?', 'ml-slider'); ?></a>
    <?php else : ?>
        <p style="text-base"><?php esc_html_e('Get the Pro add-on pack now to add a start/end date option to your slides', 'ml-slider'); ?></p>
        <a href="<?php echo esc_url(metaslider_get_upgrade_link()); ?>" class="button button-primary" target="_blank"><?php esc_html_e('Get it now!', 'ml-slider'); ?></a>
    <?php endif; ?>
</div>
