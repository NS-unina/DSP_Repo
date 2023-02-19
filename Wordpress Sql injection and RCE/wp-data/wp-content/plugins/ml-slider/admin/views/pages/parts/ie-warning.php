<div class="m-6 mt-10 bg-white shadow sm:rounded-lg">
  <div class="px-4 py-5 sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-gray-darker mt-0">
      <?php esc_html_e('Browser upgrade required', 'ml-slider'); ?>
    </h3>
    <div class="mt-2 max-w-xl text-sm leading-5 text-gray-dark">
      <p>
        <?php printf(esc_html__('It looks like you are using %s. While MetaSlider does support %s on the frontend of the website where users see your slideshows, some of the tools we provide back here require a modern browser.', 'ml-slider'), '<strong>' . esc_html__('Microsoft Internet Explorer 11', 'ml-slider') . '</strong>', esc_html__('IE11', 'ml-slider')); ?>
      </p>
    </div>
    <div class="mt-3 text-sm leading-5">
        <?php printf('<a href="https://support.microsoft.com/help/17621/internet-explorer-downloads" class="font-medium text-orange hover:text-orange-darker transition ease-in-out duration-150">%s</a>', esc_html__('Update Internet Explorer', 'ml-slider')); ?>
    </div>
  </div>
</div>
