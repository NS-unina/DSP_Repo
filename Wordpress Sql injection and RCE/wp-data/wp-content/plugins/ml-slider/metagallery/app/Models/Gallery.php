<?php

/**
 * The gallery modek
 */

namespace Extendify\MetaGallery\Models;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\Models\Model;

/**
 * The Gallery model
 */
class Gallery extends Model
{
    /**
     * The title of tha gallery
     *
     * @var string $title
     */
    public $title = '';

    /**
     * The images
     *
     * @var array $images
     */
    public $images = [];

    /**
     * The capablity required for access.
     *
     * @var array $settings
     */
    public $settings = [];

    /**
     * The post type
     *
     * @return string
     */
    public function getPostType()
    {
        return 'metagallery';
    }
}
