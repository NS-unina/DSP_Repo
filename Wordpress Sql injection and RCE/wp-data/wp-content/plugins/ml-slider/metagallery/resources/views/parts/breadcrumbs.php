<?php

/**
 * The breadcrumbs component
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
<nav class="" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
        <li class="m-0">
            <div class="flex items-center">
                <a
                title="<?php \esc_attr_e('View all galleries', 'metagallery'); ?>"
                href="<?php echo \esc_url($redirect); ?>"
                class="text-sm font-medium text-nord3 hover:underline focus:outline-none focus:ring"><?php \esc_html_e('Galleries', 'metagallery'); ?></a>
            </div>
        </li>
        <li class="m-0">
            <div class="flex items-center">
                <svg style="max-width:20px" class="flex-shrink-0 h-5 w-5 text-nord3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <span
                    x-data="{ editing: false }"
                    x-title="Gallery Title"
                    aria-label="<?php \esc_attr_e('Focus to edit the title', 'metagallery'); ?>"
                    title="<?php \esc_attr_e('Press to edit the title', 'metagallery'); ?>"
                    :contenteditable="editing.toString()"
                    @focus="editing = true;$nextTick(() => document.execCommand('selectAll',false,null))"
                    @blur="editing = false"
                    tabindex="0"
                    @keydown.enter.stop="$event.target.blur()"
                    @keydown.escape.stop="$event.target.blur()"
                    @input="$component('current').updateTitle($event.target.textContent)"
                    x-text="$component('current').title || '<?php \esc_attr_e('Title not set', 'metagallery'); ?>'"
                    class="cursor-pointer hover:underline focus:no-underline focus:p-1 focus:px-2 transition duration-200 focus:bg-white focus:outline-none focus:ring ml-2 text-sm font-medium text-nord3">
                </span>
            </div>
        </li>
    </ol>
</nav>
