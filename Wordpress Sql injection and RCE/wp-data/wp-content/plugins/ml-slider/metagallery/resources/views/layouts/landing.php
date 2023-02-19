<?php

/**
 * The main layout view
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div id="metagallery-app" class="metagallery-allowed font-body bg-nord6 min-h-screen w-full text-base pt-16">
<h1 class="text-6xl m-8 mt-0 font-medium font-heading text-nord3 whitespace-nowrap text-center">MetaGallery</h1>
<?php
if ($view) {
    include METAGALLERY_PATH . "resources/views/pages/{$view}.php";
}
?>
</div>
