<?php

/**
 * The header page view
 */

use Extendify\MetaGallery\App;

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<h1><?php echo esc_textarea(App::$name); ?></h1>
