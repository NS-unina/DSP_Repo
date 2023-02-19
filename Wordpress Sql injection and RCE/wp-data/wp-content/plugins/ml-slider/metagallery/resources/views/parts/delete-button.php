<?php

/**
 * The Delete button
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}

$deleteFormAction = admin_url('admin.php');
$deleteFormAction = add_query_arg(
    [
        'page' => METAGALLERY_PAGE_NAME,
        'route' => 'single',
    ],
    $deleteFormAction
);

?>

<button
    x-title="Delete Button"
    x-id="delete-button"
    type="button"
    x-data="{
        usedKeyboard: false,
        createFormAndPOST() {
            document.body.insertAdjacentHTML('beforeend', `
            <form
                style='display:none'
                id='hidden-delete-form'
                method='POST'
                action='<?php echo esc_url($deleteFormAction); ?>'>
                <input type='hidden' name='galleryId' value='${$component('current').data.ID}'>
                <input type='hidden' name='HTTP_X_WP_NONCE' value='<?php echo esc_attr(wp_create_nonce('wp_metagallery')); ?>'>
            </form>
            `)
            document.getElementById('hidden-delete-form').submit()
        }
    }"
    class="h-12 relative flex items-center cursor-pointer py-2 px-4 text-nord11 w-full focus:outline-none hover:bg-nord6"
    :class="{ 'focus:ring': usedKeyboard }"
    @keydown.window.tab="usedKeyboard = true"
    @click="$dispatch('open-modal', {
        headline: '<?php esc_attr_e('Delete Gallery', 'metagallery'); ?>',
        content: '<?php esc_attr_e('Are you sure you want to DELETE this gallery? Note that we will not remove images or other external data', 'metagallery'); ?>',
        source: $el.__x.$data,
        action: function() { this.createFormAndPOST() }
    });$component('editor-settings').open = false">
    <div class="ml-7 text-sm leading-none">
        <?php esc_attr_e('Delete gallery', 'metagallery'); ?>
    </div>
</button>
