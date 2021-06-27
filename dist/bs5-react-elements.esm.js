import React, { useRef, useEffect, useMemo } from 'react';
import { Modal, Tooltip } from 'bootstrap';

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
  var initialConfig = useRef(config);
  useEffect(function () {
    var component = Component.getInstance(domRef.current) || new Component(domRef.current, initialConfig.current);

    if (componentRef) {
      componentRef.current = component;
    }

    return function () {
      return component.dispose();
    };
  }, [Component, componentRef, domRef]);
  useEffect(function () {
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

var _excluded$1 = ["onShown", "onShow", "onHidden", "onHide", "onHidePrevented", "component", "config", "children"];
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
      props = _objectWithoutProperties(_ref, _excluded$1);

  var componentElement = useRef();
  var events = useMemo(function () {
    return new Map([['shown.bs.modal', onShown], ['show.bs.modal', onShow], ['hidden.bs.modal', onHidden], ['hide.bs.modal', onHide], ['hidePrevented.bs.modal', onHidePrevented]]);
  }, [onShown, onShow, onHidden, onHide, onHidePrevented]);
  useBootstrap(Modal, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

ModalComponent.displayName = 'Modal';

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

  var componentElement = useRef();
  var events = useMemo(function () {
    return new Map([['shown.bs.tooltip', onShown], ['show.bs.tooltip', onShow], ['hidden.bs.tooltip', onHidden], ['hide.bs.tooltip', onHide], ['inserted.bs.tooltip', onInserted]]);
  }, [onShown, onShow, onHidden, onHide, onInserted]);
  useBootstrap(Tooltip, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement(ElementType, _extends({
    ref: componentElement
  }, props), children);
}

TooltipComponent.defaultProps = {
  as: 'span'
};
TooltipComponent.displayName = 'Tooltip';

export { ModalComponent as Modal, TooltipComponent as Tooltip };
//# sourceMappingURL=bs5-react-elements.esm.js.map
