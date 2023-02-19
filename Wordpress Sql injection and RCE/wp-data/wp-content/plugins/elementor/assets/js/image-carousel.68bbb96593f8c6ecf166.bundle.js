/*! elementor - v3.10.2 - 29-01-2023 */
"use strict";
(self["webpackChunkelementor"] = self["webpackChunkelementor"] || []).push([["image-carousel"],{

/***/ "../assets/dev/js/frontend/handlers/image-carousel.js":
/*!************************************************************!*\
  !*** ../assets/dev/js/frontend/handlers/image-carousel.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
class ImageCarousel extends elementorModules.frontend.handlers.SwiperBase {
  getDefaultSettings() {
    return {
      selectors: {
        carousel: '.elementor-image-carousel-wrapper',
        slideContent: '.swiper-slide'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $swiperContainer: this.$element.find(selectors.carousel)
    };
    elements.$slides = elements.$swiperContainer.find(selectors.slideContent);
    return elements;
  }
  getSwiperSettings() {
    const elementSettings = this.getElementSettings(),
      slidesToShow = +elementSettings.slides_to_show || 3,
      isSingleSlide = 1 === slidesToShow,
      elementorBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
      defaultSlidesToShowMap = {
        mobile: 1,
        tablet: isSingleSlide ? 1 : 2
      };
    const swiperOptions = {
      slidesPerView: slidesToShow,
      loop: 'yes' === elementSettings.infinite,
      speed: elementSettings.speed,
      handleElementorBreakpoints: true
    };
    swiperOptions.breakpoints = {};
    let lastBreakpointSlidesToShowValue = slidesToShow;
    Object.keys(elementorBreakpoints).reverse().forEach(breakpointName => {
      // Tablet has a specific default `slides_to_show`.
      const defaultSlidesToShow = defaultSlidesToShowMap[breakpointName] ? defaultSlidesToShowMap[breakpointName] : lastBreakpointSlidesToShowValue;
      swiperOptions.breakpoints[elementorBreakpoints[breakpointName].value] = {
        slidesPerView: +elementSettings['slides_to_show_' + breakpointName] || defaultSlidesToShow,
        slidesPerGroup: +elementSettings['slides_to_scroll_' + breakpointName] || 1
      };
      lastBreakpointSlidesToShowValue = +elementSettings['slides_to_show_' + breakpointName] || defaultSlidesToShow;
    });
    if ('yes' === elementSettings.autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }
    if (isSingleSlide) {
      swiperOptions.effect = elementSettings.effect;
      if ('fade' === elementSettings.effect) {
        swiperOptions.fadeEffect = {
          crossFade: true
        };
      }
    } else {
      swiperOptions.slidesPerGroup = +elementSettings.slides_to_scroll || 1;
    }
    if (elementSettings.image_spacing_custom) {
      swiperOptions.spaceBetween = elementSettings.image_spacing_custom.size;
    }
    const showArrows = 'arrows' === elementSettings.navigation || 'both' === elementSettings.navigation,
      showDots = 'dots' === elementSettings.navigation || 'both' === elementSettings.navigation;
    if (showArrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }
    if (showDots) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      };
    }
    if ('yes' === elementSettings.lazyload) {
      swiperOptions.lazy = {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      };
    }
    return swiperOptions;
  }
  async onInit() {
    super.onInit(...arguments);
    if (!this.elements.$swiperContainer.length || 2 > this.elements.$slides.length) {
      return;
    }
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper(this.elements.$swiperContainer, this.getSwiperSettings());

    // Expose the swiper instance in the frontend
    this.elements.$swiperContainer.data('swiper', this.swiper);
    const elementSettings = this.getElementSettings();
    if ('yes' === elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    }
  }
  updateSwiperOption(propertyName) {
    const elementSettings = this.getElementSettings(),
      newSettingValue = elementSettings[propertyName],
      params = this.swiper.params;

    // Handle special cases where the value to update is not the value that the Swiper library accepts.
    switch (propertyName) {
      case 'image_spacing_custom':
        params.spaceBetween = newSettingValue.size || 0;
        break;
      case 'autoplay_speed':
        params.autoplay.delay = newSettingValue;
        break;
      case 'speed':
        params.speed = newSettingValue;
        break;
    }
    this.swiper.update();
  }
  getChangeableProperties() {
    return {
      pause_on_hover: 'pauseOnHover',
      autoplay_speed: 'delay',
      speed: 'speed',
      image_spacing_custom: 'spaceBetween'
    };
  }
  onElementChange(propertyName) {
    const changeableProperties = this.getChangeableProperties();
    if (changeableProperties[propertyName]) {
      // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library.
      if ('pause_on_hover' === propertyName) {
        const newSettingValue = this.getElementSettings('pause_on_hover');
        this.togglePauseOnHover('yes' === newSettingValue);
      } else {
        this.updateSwiperOption(propertyName);
      }
    }
  }
  onEditSettingsChange(propertyName) {
    if ('activeItemIndex' === propertyName) {
      this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  }
}
exports["default"] = ImageCarousel;

/***/ })

}]);
//# sourceMappingURL=image-carousel.68bbb96593f8c6ecf166.bundle.js.map