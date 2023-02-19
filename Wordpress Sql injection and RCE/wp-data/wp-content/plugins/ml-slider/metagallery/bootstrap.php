<?php

/**
 * Bootstrap the application
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\Shortcode;
use Extendify\MetaGallery\AdminRouter;

if (!defined('METAGALLERY_PATH')) {
    define('METAGALLERY_PATH', \plugin_dir_path(__FILE__));
}

if (is_readable(METAGALLERY_PATH . 'vendor/autoload.php')) {
    require METAGALLERY_PATH . 'vendor/autoload.php';
}

if (!defined('METAGALLERY_TEXTDOMAIN')) {
    define('METAGALLERY_TEXTDOMAIN', 'metagallery');
}

if (!defined('METAGALLERY_SIDELOAD_FROM')) {
    define('METAGALLERY_SIDELOAD_FROM', '');
}

$metagalleryAdminRouter = new AdminRouter();
$metagalleryAdminRouter->sideload(METAGALLERY_SIDELOAD_FROM);

define('METAGALLERY_PAGE_NAME', 'metagallery');

require METAGALLERY_PATH . 'resources/admin/overrides.php';

require METAGALLERY_PATH . 'routes/api.php';
require METAGALLERY_PATH . 'routes/admin.php';
// phpcs:disable
// require METAGALLERY_PATH . 'routes/console.php';
// phpcs:enable

\add_action(
    'init',
    function () {
        \load_plugin_textdomain('metagallery', false, METAGALLERY_PATH . 'languages');
    }
);
