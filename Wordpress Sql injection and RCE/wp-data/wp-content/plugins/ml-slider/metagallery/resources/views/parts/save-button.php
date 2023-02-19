<?php

/**
 * The save button
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

?>
<button
    x-title="Save Button"
    id="metagallery-save-button"
    x-data="{
        get muted() {
            return !$component('current').dirty || $component('current').saving
        },
        get disabled() {
            return !$component('current').dirty || $component('current').saving
        }
    }"
    x-cloak
    @click="$component('current').dirty && $dispatch('metagallery-save')"
    x-show.transition.opacity.duration.300="$component('current').images.length > 0 || $component('current').dirty"
    :class="{
        'text-nord6 transition duration-250': !muted,
        'text-nord9 cursor-default': muted,
        'hover:bg-nord9 hover:text-nord6': $component('current').dirty,
    }"
    :disabled="disabled"
    class="mr-4 px-6 py-1 bg-nord10 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nord4 focus:ring-nord10">
    <span x-show="$component('current').dirty && !$component('current').saving">
        <?php \esc_html_e('Save', 'metagallery'); ?>
    </span>
    <span x-show="$component('current').saving">
        <?php \esc_html_e('Saving...', 'metagallery'); ?>
    </span>
    <span x-show="!$component('current').dirty && !$component('current').saving">
        <?php \esc_html_e('Saved', 'metagallery'); ?>
    </span>
</button>
