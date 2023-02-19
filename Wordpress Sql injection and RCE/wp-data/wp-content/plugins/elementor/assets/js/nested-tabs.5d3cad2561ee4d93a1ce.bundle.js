/*! elementor - v3.10.2 - 29-01-2023 */
"use strict";
(self["webpackChunkelementor"] = self["webpackChunkelementor"] || []).push([["nested-tabs"],{

/***/ "../modules/nested-tabs/assets/js/frontend/handlers/nested-tabs.js":
/*!*************************************************************************!*\
  !*** ../modules/nested-tabs/assets/js/frontend/handlers/nested-tabs.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _baseNestedTabs = _interopRequireDefault(__webpack_require__(/*! elementor-frontend/handlers/base-nested-tabs */ "../assets/dev/js/frontend/handlers/base-nested-tabs.js"));
class NestedTabs extends _baseNestedTabs.default {
  getTabContentFilterSelector(tabIndex) {
    // Double by 2, since each `e-con` should have 'e-collapse'.
    return `*:nth-child(${tabIndex * 2})`;
  }
  onInit() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // TODO: Find better solution, Manually adding 'e-collapse' for each container.
    if (elementorFrontend.isEditMode()) {
      const $widget = this.$element,
        $removed = this.findElement('.e-collapse').remove();
      let index = 1;
      this.findElement('.e-con').each(function () {
        const $current = jQuery(this),
          $desktopTabTitle = $widget.find(`.e-n-tabs-heading > *:nth-child(${index})`),
          mobileTitleHTML = `<div class="e-n-tab-title e-collapse" data-tab="${index}" role="tab">${$desktopTabTitle.html()}</div>`;
        $current.before(mobileTitleHTML);
        ++index;
      });

      // On refresh since indexes are rearranged, do not call `activateDefaultTab` let editor control handle it.
      if ($removed.length) {
        return elementorModules.ViewModule.prototype.onInit.apply(this, args);
      }
    }
    super.onInit(...args);
  }
}
exports["default"] = NestedTabs;

/***/ })

}]);
//# sourceMappingURL=nested-tabs.5d3cad2561ee4d93a1ce.bundle.js.map