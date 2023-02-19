<?php if (!defined('ABSPATH')) {
die('No direct access.');
} ?>

<div class="metaslider-start mt-16">
    <div class="metaslider-welcome">
        <div class="welcome-panel-content" style="min-height:270px;">
            <h2><?php esc_html_e('Thank you for installing MetaSlider, the #1 WordPress slideshow plugin', 'ml-slider'); ?></h2>
            <p class="about-description"><?php esc_html_e('To create your first slideshow, select one of the options below.', 'ml-slider'); ?></p>
            <hr>
            <div class="ms-panel-container">
                <div class="">
                    <div>
                        <h3><?php esc_html_e('Quick start', 'ml-slider'); ?></h3>
                        <p><?php esc_html_e('To get started right away, drag and drop your images below.', 'ml-slider'); ?></p>
                    </div>
                    <div>
                        <metaslider-dragdrop-import></metaslider-dragdrop-import>
                        <?php
                            $max_upload_size = wp_max_upload_size();
                            if (!$max_upload_size) {
                                $max_upload_size = 0;
                            }
                            printf(esc_html__('Maximum upload file size: %s.'), esc_html(size_format($max_upload_size)));
                            
                            /*
                            TODO: Maybe add a button to show the media library uploader
                            <p><a class="button button-primary button-hero install-now" href="#">Open media library</a></p>
                            <p><a href="#"><?php// _e('Learn more about this tool', 'ml-slider'); ?></a></p>
                            */ ?>
                    </div>
                </div>
                <div class="">

                    <div>
                        <?php $blank_title = metaslider_pro_is_active() ? __('Using more than image slides?', 'ml-slider') : __('Not quite ready?', 'ml-slider'); ?>
                        <h3><?php echo esc_html($blank_title); ?></h3>
                        <p><?php esc_html_e('Feel free to create a slideshow with no images. If you are a premium member using the add-on pack, select this option to access video, layer, and external URL slides.', 'ml-slider'); ?></p>
                    </div>

                    <div class="try-gutenberg-action">
                        <p><a class="button button-secondary button-hero install-now" href="<?php echo esc_url(wp_nonce_url(admin_url("admin-post.php?action=metaslider_create_slider"), "metaslider_create_slider")); ?>" data-name="Classic Editor" data-slug="classic-editor"><?php esc_html_e('Create blank slideshow', 'ml-slider'); ?></a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php // TODO: I think after here maybe we can add images from their media library, or perhaps from an external image API
