<?php

$extendifysdk_ms_notices_key = 'extendifysdk_complete_install';
$extendifysdk_ms_notices_nonce = wp_create_nonce($extendifysdk_ms_notices_key);

function ml_slider_has_extendify_already()
{
    return isset($GLOBALS['extendify_sdk_partner']) && $GLOBALS['extendify_sdk_partner'] === '';
}

add_action('admin_notices', function () use ($extendifysdk_ms_notices_key, $extendifysdk_ms_notices_nonce) {
    $current_page = get_current_screen();
    if (!$current_page || !in_array($current_page->base, array('plugins'))) {
        return;
    }

    $delay_in_days_have_passed = get_option('ms_was_installed_on') < strtotime('-' . MetaSliderPlugin::EXTENDIFY_NOTICE_DELAY_IN_DAYS . ' days');
    if (! $delay_in_days_have_passed) {
        return;
    }
    ob_start(); ?>
<p>
    <?php esc_html_e('MetaSlider users have been asking for easier options to create and edit their sites using the new block editor and to make their sliders stand out. We\'re excited to announce that MetaSlider has partnered with the Extendify library of Gutenberg patterns and templates to bring the power of WordPress 5.9 to the most popular WordPress slider plugin!  By clicking “Install & Activate Extendify” you will get access to 10 free monthly imports of patterns and templates. Installing Extendify is optional, and MetaSlider will continue to work if you decide to not install Extendify.', 'ml-slider') ?>
</p>

<button id="extendify-install-button" type="button" class="button-primary" style="margin-bottom: 0.3rem;margin-top: 0.5rem;"><?php esc_html_e('Install & Activate Extendify', 'ml-slider'); ?></button>
<script>
    jQuery(function ($) {
        $('#extendify-install-button').on('click', function () {
            const _this = $(this);
            var data = {
                action: 'handle_extendify_install',
                _wpnonce: '<?php echo esc_js($extendifysdk_ms_notices_nonce); ?>'
            };
            _this.attr('disabled', true).text("<?php esc_html_e('Installing...', 'ml-slider'); ?>");
            $.post(ajaxurl, data, function (response) {
                _this.text("<?php esc_html_e('Finished. Reloading...', 'ml-slider'); ?>");
                setTimeout(function () {
                    // Regardless of pass/fail, refresh to hide the notice.
                    window.location.reload();
                }, 1500);
            });
        });
    });
</script>
<p><small>
    <?php
    // translators: %s surrounding the word 'here' and is wrapped with <a>.
    printf(esc_html__('Learn more at %sextendify.com%s. ', 'ml-slider'), '<a target="_blank" href="https://extendify.com?utm_source=metaslider&utm_medium=notice&utm_campaign=library_intro">', '</a>');
    // translators: %s surrounding the word 'here' and is wrapped with <a>.
    printf(esc_html__('If you\'d prefer not to have this button display in the editor, %ssee here%s.', 'ml-slider'), '<a target="_blank" href="https://extendify.com/how-to-disable-the-extendify-library?utm_source=metaslider&utm_medium=notice&utm_campaign=library_intro">', '</a>'); ?>
</small></p>
<?php
    $extendifysdk_ms_notices_content = ob_get_clean();

    // In short, the notice will always show until they press dismiss
    if (!ml_slider_has_extendify_already() && !get_user_option($extendifysdk_ms_notices_key)) { ?>
<div id="<?php echo esc_attr($extendifysdk_ms_notices_key); ?>" class="notice notice-info"
    style="display:flex;align-items:stretch;justify-content:space-between;position:relative;border-left-color:#29375B">
    <div style="display:flex;align-items:flex-start;position:relative">
        <div style="margin-right:1.25rem;margin-left:0.5rem; margin-top:1.25rem">
                <svg fill="none" height="50" viewBox="0 0 68 68" width="50" xmlns="http://www.w3.org/2000/svg"><path d="m34 0c-18.7656 0-34 15.2344-34 34s15.2344 34 34 34 34-15.2344 34-34c-.1009-18.7656-15.2344-34-34-34zm-23.911 43.9881 19.7745-25.1216 3.2285 4.1365-16.4451 20.9851zm32.9911 0-8.273-10.5934 3.3294-4.2374 11.6024 14.7299h-6.6588zm8.1721 0-13.2166-16.7477-13.1157 16.7477h-6.6588l19.7745-25.1216 19.7745 25.1216z" fill="#29375b"/></svg>
        </div>
        <div>
            <h3 style="margin-bottom:0.25rem;">
                <?php printf(esc_html__('MetaSlider + Gutenberg = %s', 'ml-slider'), '🚀'); ?></h3>
            <div>
                <?php echo $extendifysdk_ms_notices_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </div>
        </div>
    </div>
    <div style="margin:5px -5px 0 0;flex-shrink: 0;">
        <button
            style="max-width:15px;border:0;background:0;color: #7b7b7b;white-space:nowrap;cursor: pointer;padding: 0"
            title="<?php esc_attr_e('Dismiss notice', 'ml-slider') ?>"
            aria-label="<?php esc_attr_e('Dismiss Extendify notice', 'ml-slider') ?>"
            onclick="jQuery('#<?php echo esc_js($extendifysdk_ms_notices_key); ?>').remove();jQuery.post(window.ajaxurl, {action: 'handle_<?php echo esc_js($extendifysdk_ms_notices_key); ?>', _wpnonce: '<?php echo esc_js($extendifysdk_ms_notices_nonce) ?>' });">
            <svg width="15" height="15" style="width:100%" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</div>
    <?php }
});

add_action('wp_ajax_handle_' . $extendifysdk_ms_notices_key, function () use ($extendifysdk_ms_notices_key) {
    if (! isset($_REQUEST['_wpnonce']) || ! wp_verify_nonce(sanitize_key($_REQUEST['_wpnonce']), $extendifysdk_ms_notices_key)) {
        wp_send_json_error(array(
            'message' => esc_html__('The security check failed. Please refresh the page and try again.', 'ml-slider')
        ), 401);
    }
    update_user_option(get_current_user_id(), $extendifysdk_ms_notices_key, time());
    wp_send_json_success();
});

add_action('wp_ajax_handle_extendify_install', function () use ($extendifysdk_ms_notices_key) {
    if (! isset($_REQUEST['_wpnonce']) || ! wp_verify_nonce(sanitize_key($_REQUEST['_wpnonce']), $extendifysdk_ms_notices_key)) {
        wp_send_json_error(array(
            'message' => esc_html__('The security check failed. Please refresh the page and try again.', 'ml-slider')
        ), 401);
    }

    if (method_exists('Extendify\Library\Plugin', 'install_and_activate_plugin')) {
        try {
            $installed = Extendify\Library\Plugin::install_and_activate_plugin('extendify');

            if (true === $installed) {
                update_user_option(get_current_user_id(), $extendifysdk_ms_notices_key, time());
            }

            wp_send_json_success();
        } catch (Exception $e) {
            wp_send_json_error(array(
                'message' => $e->getMessage()
            ), 500);
        }
    } else {
        wp_send_json_error(array(
            'message' => __('The Extendify SDK is not loaded.', 'ml-slider')
        ), 500);
    }
});
