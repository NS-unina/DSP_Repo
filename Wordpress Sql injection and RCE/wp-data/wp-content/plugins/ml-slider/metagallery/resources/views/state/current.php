<?php

/**
 * The current gallery state
 */

if (! defined('ABSPATH')) {
    die('No direct access.');
}

$removeQuotes = function (&$images) {
    foreach ($images as &$image) {
        $image['alt'] = str_replace('&quot;', '', $image['alt']);
    }
};

// Make sure we don't break JSON syntax. It is breaking even for &quot; and not just ".
$removeQuotes($data['gallery'][0]->meta['images']);
?>

<div
    x-id="current"
    x-title="Current Gallery"
    x-data="CurrentGallery(<?php \esc_attr_e(\wp_json_encode($data['gallery'][0])); ?>)"
    @metagallery-save.window="save()"
    x-init="init()"></div>
