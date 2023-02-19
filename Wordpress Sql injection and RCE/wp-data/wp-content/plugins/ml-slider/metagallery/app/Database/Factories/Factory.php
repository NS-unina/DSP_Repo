<?php

/**
 * Factory to create models
 */

namespace Extendify\MetaGallery\Database\Factories;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Faker\Factory as Faker;

/**
 * Factory to create models
 */
abstract class Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model;

    /**
     * The current Faker instance.
     *
     * @var \Faker\Generator
     */
    protected $faker;

    /**
     * Create a new factory instance.
     */
    public function __construct()
    {
        $this->faker = Faker::create();
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    abstract public function definition();
}
