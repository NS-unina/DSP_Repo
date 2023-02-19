<?php

/**
 * The notice that shows in the settings area
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<div class="rounded-md bg-nord8 text-nord2 mb-6 p-4">
    <div class="flex">
        <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
        </div>
        <div class="ml-3 flex-1 md:flex md:justify-between">
            <p class="text-sm">
                <?php \esc_html_e('This gallery extention is in active development, so check back soon for more features.', 'metagallery'); ?>
            </p>
        </div>
    </div>
</div>
