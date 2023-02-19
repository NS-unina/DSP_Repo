<?php

/**
 * A factory class to build galleries
 */

namespace Extendify\MetaGallery\Database\Factories;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\Models\Gallery;

/**
 * The user factory
 */
class GalleryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Gallery::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'images' => $this->faker->unique()->safeEmail,
            'settings' => [],
        ];
    }
}
