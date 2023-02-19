<?php

/**
 * A basic API route interface
 */

namespace Extendify\MetaGallery\Contracts;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

/**
 * Contract for routes
 *
 * @since 0.1.0
 */
interface BasicRoute
{
    /**
     * Invoker
     *
     * @param \WP_REST_Request $request - The request.
     *
     * @return WP_Query
     */
    public function __invoke(\WP_REST_Request $request);
}
