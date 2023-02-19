<?php

/**
 * Console routes
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\App;

// phpcs:disable
// add_action('cli_init', function () {
//     // Only one method now so just inlining it to keep it simple.
//     \WP_CLI::add_command('refresh-users', function () {
//         App::get('UserData')->clear_cache()->fetch();
//         \WP_CLI::line(__('Updated!', App::$slug));
//     });
// });
// phpcs:enable
