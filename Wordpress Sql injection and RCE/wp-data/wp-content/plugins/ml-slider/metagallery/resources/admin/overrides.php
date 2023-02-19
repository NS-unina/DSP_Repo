<?php

/**
 * Overrides to various WP defaults
 */

/**
 * Checks whether the page is a metagallery page.
 *
 * @return boolean
 */
function metagalleryCheckPageIsOurs()
{
    // phpcs:ignore WordPress.Security.NonceVerification.Recommended
    return isset($_GET['page']) && (sanitize_text_field(wp_unslash($_GET['page'])) === METAGALLERY_PAGE_NAME);
}

add_action(
    'admin_menu',
    function () {
        if (metagalleryCheckPageIsOurs()) {
            remove_filter('update_footer', 'core_update_footer');
            add_filter('admin_footer_text', '__return_empty_string');
        }
    }
);
