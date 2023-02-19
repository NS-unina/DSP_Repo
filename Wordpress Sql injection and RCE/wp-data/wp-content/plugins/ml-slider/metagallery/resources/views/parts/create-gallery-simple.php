<?php

/**
 * A simple form to create a gallery with a title
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

$redirect = add_query_arg(
    [
        'page' => METAGALLERY_PAGE_NAME,
        'route' => 'archive'
    ],
    \admin_url('admin.php')
);
?>

<form
    x-data="{ ready: false, title: '' }"
    class="w-full"
    method="POST"
    @submit.prevent="ready && title.length && $el.submit()"
    action="<?php echo \esc_url($redirect); ?>">
    <input type="hidden" name="HTTP_X_WP_NONCE" value="<?php echo \esc_attr(\wp_create_nonce('wp_metagallery')); ?>">
    <div class="w-full mb-6" x-cloak x-show.transition.opacity.duration.500ms="ready">
        <label for="title" class="sr-only"><?php \esc_html_e('Title', 'metagallery'); ?></label>
        <div class="mt-1">
            <input type="text" x-model="title" x-ref="title" name="title" autocomplete="off" class="shadow-sm px-4 p-2 sm:text-lg focus:ring-2 focus:ring-nord8 focus:border-nord8 block w-full rounded-md" placeholder="" aria-describedby="title-description">
        </div>
        <p class="mt-2 text-sm text-gray-500" id="title-description">
        <?php \esc_html_e('Give your gallery a name.', 'metagallery'); ?></p>
    </div>
    <div>
        <button type="submit"
            @click="ready = true;$nextTick(() => $refs.title.focus())"
            class="mx-auto flex items-center transition duration-250 px-6 py-1 bg-nord4 hover:bg-nord1 hover:text-nord6 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nord8"
            x-text="ready ? '<?php \esc_html_e('Create gallery', 'metagallery'); ?>' : '<?php \esc_html_e('Add gallery', 'metagallery'); ?>'">
        </button>
    </div>
</form>
