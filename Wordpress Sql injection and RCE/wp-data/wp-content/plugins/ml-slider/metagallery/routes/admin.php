<?php

/**
 * Admin page routes
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\AdminRouter;
use Extendify\MetaGallery\Controllers\GalleryController;

// Opens possability for namespaced pages if we need to change the implementation but preserve the old pages.
// ie, the first parameter is the namespace.
AdminRouter::get('', 'archive', [GalleryController::class, 'index']);
AdminRouter::post('', 'archive', [GalleryController::class, 'store']);

AdminRouter::get('', 'create', [GalleryController::class, 'create']);
AdminRouter::get('', 'single', [GalleryController::class, 'show']);
AdminRouter::post('', 'single', [GalleryController::class, 'destroy']);
AdminRouter::get('', 'start', [GalleryController::class, 'start']);

\add_action(
    'admin_init',
    function () {
        AdminRouter::register();
    }
);
