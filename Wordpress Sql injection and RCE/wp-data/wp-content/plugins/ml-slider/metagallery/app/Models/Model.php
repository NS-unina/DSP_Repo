<?php

/**
 * The Model base class
 */

namespace Extendify\MetaGallery\Models;

if (!defined('ABSPATH')) {
    die('No direct access.');
}

use Extendify\MetaGallery\App;

/**
 * Simple Model query type builder
 *
 * @since 0.1.0
 */
abstract class Model
{
    /**
     * How to order the query results
     *
     * @var string $modified
     */
    protected $orderBy = 'modified';

    /**
     * How many results to return
     *
     * @var int $postsPerPage
     */
    protected $postsPerPage = -1;

    /**
     * Extra parameters
     *
     * @var array $extraParameters
     */
    protected $extraParameters = [];

    /**
     * Can specify what to pluck
     *
     * @var array $toPluck
     */
    protected $toPluck = [];

    /**
     * Specify which meta data
     *
     * @var array $mwantedAttributes
     */
    protected $wantedAttributes = [];

    // phpcs:disable
    /**
     * Not sure where I was going with this, but leaving it in
     *
     * @var $dbKey
     */
    // protected $dbKey = '';
    // phpcs:enable

    /**
     * The constructor
     *
     * @return void
     */
    public function __construct()
    {
        $this->dbKey = App::$slug;
    }
    /**
     * Should return the model post type.
     *
     * @return string
     */
    abstract public function getPostType();

    /**
     * Wrapper for returning the query.
     * TODO maybe cache here?
     *
     * @return WP_Query
     */
    public function query()
    {
        // TODO: probably this should be raw DB queries eventually.
        return $this->actualQuery();
    }

    /**
     * Perform the query
     *
     * @return WP_Query
     */
    private function actualQuery()
    {
        $posts = \get_posts(
            array_merge(
                [
                    'post_type' => $this->getPostType(),
                    'post_status' => ['publish'],
                    'orderby' => $this->orderBy,
                    'posts_per_page' => $this->postsPerPage,
                ],
                $this->extraParameters
            )
        );

        $posts = array_map(
            function ($post) {
                $meta = [];
                foreach ($this->getExtraAttributes() as $key) {
                    $meta[$key] = \get_post_meta(
                        $post->ID,
                        $this->dbKey . '-' . $key,
                        true
                    );
                }

                $post->meta = $meta;
                return $post;
            },
            $posts
        );

        if (!$this->toPluck) {
            return $posts;
        }

        return array_map(
            function ($post) {
                return array_intersect_key(
                    $post->to_array(),
                    array_flip($this->toPluck)
                );
            },
            $posts
        );
    }

    /**
     * Gte extra available properties
     *
     * @return array
     */
    private function getExtraAttributes()
    {
        if ($this->wantedAttributes) {
            return $this->wantedAttributes;
        }

        $class = new \ReflectionClass($this);
        return array_map(
            function ($prop) {
                return $prop->name;
            },
            $class->getProperties(\ReflectionProperty::IS_PUBLIC)
        );
    }

    /**
     * Get the first page
     *
     * @return WP_Query
     */
    public function first()
    {
        $this->postsPerPage = 1;
        $query = $this->query();
        return isset($query[0]) ? $query[0] : $query;
    }

    /**
     * Get the query results.
     *
     * @return WP_Query
     */
    public function all()
    {
        $this->postsPerPage = -1;
        return $this->query();
    }

    /**
     * Specify constraints
     *
     * @param array $extraParameters - The meta fields.
     *
     * @return self
     */
    public function where($extraParameters)
    {
        $this->extraParameters = $extraParameters;
        return $this;
    }

    /**
     * Save a new model.
     *
     * @return int
     */
    public function save()
    {
        $class = new \ReflectionClass($this);
        $properties = [];
        foreach ($class->getProperties(\ReflectionProperty::IS_PUBLIC) as $prop) {
            $properties[$prop->name] = $class->getProperty($prop->name)->getValue($this);
        }

        // TODO: Handle wp_error.
        $id = \wp_insert_post(
            [
                'post_status' => 'publish',
                'post_type' => $this->getPostType(),
            ]
        );

        foreach ($properties as $key => $value) {
            \update_post_meta($id, $this->dbKey . '-' . $key, $value);
        }

        return $id;
    }

    /**
     * Add fields pluck.
     *
     * @param array $fields - The meta fields.
     *
     * @return self
     */
    public function pluck(array $fields = [])
    {
        $this->toPluck = $fields;
        return $this;
    }

    /**
     * Get the class.
     *
     * @return self
     */
    public static function get()
    {
        $class = new static();
        return $class;
    }

    /**
     * Add fields to the query.
     *
     * @param array $fields - The meta fields.
     *
     * @return self
     */
    public static function getWith(array $fields)
    {
        $class = new static();
        $class->wantedAttributes = $fields;
        return $class;
    }
}
