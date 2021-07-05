(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('bootstrap')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'bootstrap'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BS5ReactElements = {}, global.React, global.bootstrap));
}(this, (function (exports, React, bootstrap) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  /**
   * Hook to initialize a component, bind events, and expose bootstrap apis.
   *
   * @param {Object} Component Bootstrap component object (Modal, Tooltip, etc)
   * @param {Object} config (optional) Configuration object of the component
   * @param {Object} componentRef (optional) A ref to reference the component
   * @param {Object} domRef A ref pointing to the dom element of the component
   * @param {Map} events Mapping of bootstrap event names and function handlers
   */

  function useBootstrap(Component, config, componentRef, domRef, events) {
    var initialConfig = React.useRef(config);
    React.useEffect(function () {
      var component = Component.getInstance(domRef.current) || new Component(domRef.current, initialConfig.current);

      if (componentRef) {
        componentRef.current = component;
      }

      return function () {
        return component.dispose();
      };
    }, [Component, componentRef, domRef]);
    React.useEffect(function () {
      var el = domRef.current;
      events.forEach(function (value, key) {
        el.addEventListener(key, value);
      });
      return function () {
        events.forEach(function (value, key) {
          el.removeEventListener(key, value);
        });
      };
    }, [domRef, events]);
  }

  var _excluded$9 = ["onClosed", "onClose", "component", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/alerts/">Bootstrap alert component.</a>
   */

  function AlertComponent(_ref) {
    var onClosed = _ref.onClosed,
        onClose = _ref.onClose,
        component = _ref.component,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$9);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['closed.bs.alert', onClosed], ['close.bs.alert', onClose]]);
    }, [onClosed, onClose]);
    useBootstrap(bootstrap.Alert, undefined, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  AlertComponent.displayName = 'Alert';

  var _excluded$8 = ["onSlid", "onSlide", "component", "config", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/carousel/">Bootstrap carousel component.</a>
   */

  function CarouselComponent(_ref) {
    var onSlid = _ref.onSlid,
        onSlide = _ref.onSlide,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$8);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['slid.bs.carousel', onSlid], ['slide.bs.carousel', onSlide]]);
    }, [onSlid, onSlide]);
    useBootstrap(bootstrap.Carousel, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  CarouselComponent.displayName = 'Carousel';

  var _excluded$7 = ["onShown", "onShow", "onHidden", "onHide", "component", "config", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/collapse/">Bootstrap collapse component.</a>
   */

  function CollapseComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$7);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.collapse', onShown], ['show.bs.collapse', onShow], ['hidden.bs.collapse', onHidden], ['hide.bs.collapse', onHide]]);
    }, [onShown, onShow, onHidden, onHide]);
    useBootstrap(bootstrap.Collapse, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  CollapseComponent.displayName = 'Collapse';

  var _excluded$6 = ["onShown", "onShow", "onHidden", "onHide", "component", "config", "children", "as"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/dropdowns/">Bootstrap dropdown component.</a>
   */

  function DropdownComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        ElementType = _ref.as,
        props = _objectWithoutProperties(_ref, _excluded$6);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.dropdown', onShown], ['show.bs.dropdown', onShow], ['hidden.bs.dropdown', onHidden], ['hide.bs.dropdown', onHide]]);
    }, [onShown, onShow, onHidden, onHide]);
    useBootstrap(bootstrap.Dropdown, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement(ElementType, _extends({
      ref: componentElement
    }, props), children);
  }

  DropdownComponent.defaultProps = {
    as: 'button'
  };
  DropdownComponent.displayName = 'Dropdown';

  var _excluded$5 = ["onShown", "onShow", "onHidden", "onHide", "onHidePrevented", "component", "config", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/modal/">Bootstrap modal component.</a>
   */

  function ModalComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        onHidePrevented = _ref.onHidePrevented,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$5);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.modal', onShown], ['show.bs.modal', onShow], ['hidden.bs.modal', onHidden], ['hide.bs.modal', onHide], ['hidePrevented.bs.modal', onHidePrevented]]);
    }, [onShown, onShow, onHidden, onHide, onHidePrevented]);
    useBootstrap(bootstrap.Modal, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  ModalComponent.displayName = 'Modal';

  var _excluded$4 = ["onShown", "onShow", "onHidden", "onHide", "component", "config", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/offcanvas/">Bootstrap offcanvas component.</a>
   */

  function OffcanvasComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$4);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.offcanvas', onShown], ['show.bs.offcanvas', onShow], ['hidden.bs.offcanvas', onHidden], ['hide.bs.offcanvas', onHide]]);
    }, [onShown, onShow, onHidden, onHide]);
    useBootstrap(bootstrap.Offcanvas, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  OffcanvasComponent.displayName = 'Offcanvas';

  var _excluded$3 = ["onShown", "onShow", "onHidden", "onHide", "onInserted", "component", "config", "children", "as"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/popovers/">Bootstrap popover component.</a>
   */

  function PopoverComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        onInserted = _ref.onInserted,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        ElementType = _ref.as,
        props = _objectWithoutProperties(_ref, _excluded$3);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.popover', onShown], ['show.bs.popover', onShow], ['hidden.bs.popover', onHidden], ['hide.bs.popover', onHide], ['inserted.bs.popover', onInserted]]);
    }, [onShown, onShow, onHidden, onHide, onInserted]);
    useBootstrap(bootstrap.Popover, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement(ElementType, _extends({
      ref: componentElement
    }, props), children);
  }

  PopoverComponent.defaultProps = {
    as: 'span'
  };
  PopoverComponent.displayName = 'Popover';

  var _excluded$2 = ["onShown", "onShow", "onHidden", "onHide", "component", "children", "as"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/navs-tabs/">Bootstrap tab component.</a>
   */

  function TabComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        component = _ref.component,
        children = _ref.children,
        ElementType = _ref.as,
        props = _objectWithoutProperties(_ref, _excluded$2);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.tab', onShown], ['show.bs.tab', onShow], ['hidden.bs.tab', onHidden], ['hide.bs.tab', onHide]]);
    }, [onShown, onShow, onHidden, onHide]);
    useBootstrap(bootstrap.Tab, undefined, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement(ElementType, _extends({
      ref: componentElement
    }, props), children);
  }

  TabComponent.defaultProps = {
    as: 'button'
  };
  TabComponent.displayName = 'Tab';

  var _excluded$1 = ["onShown", "onShow", "onHidden", "onHide", "component", "config", "children"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/toasts/">Bootstrap toast component.</a>
   */

  function ToastComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$1);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.toast', onShown], ['show.bs.toast', onShow], ['hidden.bs.toast', onHidden], ['hide.bs.toast', onHide]]);
    }, [onShown, onShow, onHidden, onHide]);
    useBootstrap(bootstrap.Toast, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement("div", _extends({
      ref: componentElement
    }, props), children);
  }

  ToastComponent.displayName = 'Toast';

  var _excluded = ["onShown", "onShow", "onHidden", "onHide", "onInserted", "component", "config", "children", "as"];
  /**
   * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/tooltips/">Bootstrap tooltip component.</a>
   */

  function TooltipComponent(_ref) {
    var onShown = _ref.onShown,
        onShow = _ref.onShow,
        onHidden = _ref.onHidden,
        onHide = _ref.onHide,
        onInserted = _ref.onInserted,
        component = _ref.component,
        config = _ref.config,
        children = _ref.children,
        ElementType = _ref.as,
        props = _objectWithoutProperties(_ref, _excluded);

    var componentElement = React.useRef();
    var events = React.useMemo(function () {
      return new Map([['shown.bs.tooltip', onShown], ['show.bs.tooltip', onShow], ['hidden.bs.tooltip', onHidden], ['hide.bs.tooltip', onHide], ['inserted.bs.tooltip', onInserted]]);
    }, [onShown, onShow, onHidden, onHide, onInserted]);
    useBootstrap(bootstrap.Tooltip, config, component, componentElement, events);
    return /*#__PURE__*/React__default['default'].createElement(ElementType, _extends({
      ref: componentElement
    }, props), children);
  }

  TooltipComponent.defaultProps = {
    as: 'span'
  };
  TooltipComponent.displayName = 'Tooltip';

  exports.Alert = AlertComponent;
  exports.Carousel = CarouselComponent;
  exports.Collapse = CollapseComponent;
  exports.Dropdown = DropdownComponent;
  exports.Modal = ModalComponent;
  exports.Offcanvas = OffcanvasComponent;
  exports.Popover = PopoverComponent;
  exports.Tab = TabComponent;
  exports.Toast = ToastComponent;
  exports.Tooltip = TooltipComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bs5-react-elements.js.map
