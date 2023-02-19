<?php

/**
 * The start page view
 */

if (!defined('ABSPATH')) {
    die('No direct access.');
}
?>

<div class="max-w-screen-md mx-auto">
    <p class="text-center">
<?php
printf(
    // translators: %s are anchor tags i.e. <strong></strong>.
    \esc_html__('Hi, welcome the gallery project by MetaSlider. %1$sRedefining WordPress galleries%2$s.', 'metagallery'),
    '<strong>',
    '</strong>'
);
?>
    </p>
    <div class="my-20 flex items-center justify-center">
        <?php require METAGALLERY_PATH . 'resources/views/parts/create-gallery-simple.php'; ?>
    </div>
    <div class="bg-nord5 p-10 py-6">
        <!--
            Super secret dev motivations:
            1. YAGNI
            2. No jQuery unless required to interact with WP
            3. Keep the project open for extention. Try not to close up the code or lock in.
        -->
        <h3 class="mb-3"><?php \esc_html_e('We are building the gallery following these principles:', 'metagallery'); ?></h3>
        <ul>
            <li>
            <?php
                // translators: %s is an emoji.
                printf(\esc_html__('%s Fast - Using modern best practices, your galleries will be faster than ever.', 'metagallery'), '🚀');
            ?>
            </li>

            <li>
            <?php
                // translators: %s is an emoji.
                printf(\esc_html__('%s SEO-focused - Search engines will love your galleries.', 'metagallery'), '🏢');
            ?>
            </li>

            <li>
            <?php
                // translators: %s is an emoji.
                printf(\esc_html__('%s Fully WCAG accessible - All users will be able to enjoy your galleries.', 'metagallery'), '⌨️');
            ?>
            </li>

            <li>
            <?php
                // translators: %s is an emoji.
                printf(\esc_html__('%s Easy to use, fun to master. With advanced features for those who need them.', 'metagallery'), '⛵');
            ?>
            </li>
        </ul>
    </div>
</div>
