<?php

/**
 * Api routes
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\App;
use Extendify\MetaGallery\APIRouter;
use Extendify\MetaGallery\API\Galleries;
use Extendify\MetaGallery\API\GalleryUpdate;

// TODO: Not really necessary but this could be refactored to be more like the admin router.
\add_action(
    'rest_api_init',
    function () {
        $namespace = APP::$slug . '/' . APP::$apiVersion;
        APIRouter::get($namespace, '/gallery', Galleries::class);

        // Should be "put" but can't find docs on pasing data.
        APIRouter::post($namespace, '/gallery/(?P<id>\d+)', GalleryUpdate::class);
    }
);
