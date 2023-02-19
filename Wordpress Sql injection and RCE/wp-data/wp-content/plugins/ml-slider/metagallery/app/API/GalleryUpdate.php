<?php

/**
 * Return all galleries
 */

namespace Extendify\MetaGallery\API;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\Models\Gallery;
use Extendify\MetaGallery\Contracts\BasicRoute;
use Extendify\MetaGallery\Controllers\GalleryController;

/**
 * Route to do something
 *
 * @since 0.1.0
 */
class GalleryUpdate implements BasicRoute
{
    /**
     * Update single gallery - TODO: maybe move this to main controller
     *
     * @param \WP_REST_Request $request - The request.
     * @return void
     */
    public function __invoke(\WP_REST_Request $request)
    {
        $galleryControler = new GalleryController();
        $response = $galleryControler->update($request);

        if (\is_wp_error($response)) {
            \wp_send_json_error(
                [
                    'message' => $response->get_message(),
                ],
                403
            );
        }

        \wp_send_json_success($response, 200);
    }
}
