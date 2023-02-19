<?php

/**
 * The shortcode helper
 */

namespace Extendify\MetaGallery;

use Extendify\MetaGallery\App;
use Extendify\MetaGallery\Models\Gallery;

/**
 * Handles setting up the shortcode.
 *
 * @since 0.1.0
 */
class Shortcode
{
    /**
     * Adds scripts, styles and the view returned.
     *
     * @since 0.1.0
     * @return void
     */
    public function __construct()
    {
        add_shortcode(
            App::$slug,
            function ($attributes) {
                $attributes = shortcode_atts(['id' => 0], $attributes, 'metagallery');

                $metagallery = Gallery::get()->where(['p' => intval($attributes['id'])])->first();
                if (\get_post_type($metagallery) !== 'metagallery') {
                    return '<!-- MetaGallery: Invalid Gallery -->';
                }

                $this->addStyles();
                $this->addScripts($metagallery->ID);

                ob_start();
                View::shortcode($metagallery);
                return ob_get_clean();
            }
        );
    }

    /**
     * Add styles
     *
     * @since 0.1.0
     * @return void
     */
    public function addStyles()
    {
        \wp_enqueue_style(
            App::$slug . '-styles',
            METAGALLERY_BASE_URL . 'public/build/metagallery-styles.css',
            [],
            App::$version,
            'all'
        );
    }

    /**
     * Add scripts
     *
     * @since 0.1.0
     * @param int $galleryId - The ID of the gallery to initialize.
     * @return void
     */
    public function addScripts($galleryId)
    {
        \wp_enqueue_script(
            App::$slug . '-scripts',
            METAGALLERY_BASE_URL . 'public/build/metagallery-scripts.js',
            [],
            App::$version,
            true
        );
        \wp_add_inline_script(App::$slug . '-scripts', "new window.MetaGallery('#metagallery-{$galleryId}')");
    }
}
