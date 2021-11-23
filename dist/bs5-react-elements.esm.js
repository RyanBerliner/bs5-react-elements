import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { Alert, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, Tab, Toast, Tooltip } from 'bootstrap';
import ReactDOM from 'react-dom';

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
  const initialConfig = useRef(config);
  useEffect(() => {
    const component = Component.getInstance(domRef.current) || new Component(domRef.current, initialConfig.current);

    if (componentRef) {
      componentRef.current = component;
    }

    return () => component.dispose();
  }, [Component, componentRef, domRef]);
  useEffect(() => {
    const el = domRef.current;
    events.forEach((value, key) => {
      el.addEventListener(key, value);
    });
    return () => {
      events.forEach((value, key) => {
        el.removeEventListener(key, value);
      });
    };
  }, [domRef, events]);
}

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/alerts/">Bootstrap alert component.</a>
 */

function AlertComponent(_ref) {
  let {
    onClosed,
    onClose,
    component,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['closed.bs.alert', onClosed], ['close.bs.alert', onClose]]);
  }, [onClosed, onClose]);
  useBootstrap(Alert, undefined, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

AlertComponent.displayName = 'Alert';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/carousel/">Bootstrap carousel component.</a>
 */

function CarouselComponent(_ref) {
  let {
    onSlid,
    onSlide,
    component,
    config,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['slid.bs.carousel', onSlid], ['slide.bs.carousel', onSlide]]);
  }, [onSlid, onSlide]);
  useBootstrap(Carousel, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

CarouselComponent.displayName = 'Carousel';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/collapse/">Bootstrap collapse component.</a>
 */

function CollapseComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    component,
    config,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.collapse', onShown], ['show.bs.collapse', onShow], ['hidden.bs.collapse', onHidden], ['hide.bs.collapse', onHide]]);
  }, [onShown, onShow, onHidden, onHide]);
  useBootstrap(Collapse, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

CollapseComponent.displayName = 'Collapse';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/dropdowns/">Bootstrap dropdown component.</a>
 */

function DropdownComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    component,
    config,
    children,
    as: ElementType,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.dropdown', onShown], ['show.bs.dropdown', onShow], ['hidden.bs.dropdown', onHidden], ['hide.bs.dropdown', onHide]]);
  }, [onShown, onShow, onHidden, onHide]);
  useBootstrap(Dropdown, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement(ElementType, _extends({
    ref: componentElement
  }, props), children);
}

DropdownComponent.defaultProps = {
  as: 'button'
};
DropdownComponent.displayName = 'Dropdown';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/modal/">Bootstrap modal component.</a>
 */

function ModalComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    onHidePrevented,
    component,
    config,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.modal', onShown], ['show.bs.modal', onShow], ['hidden.bs.modal', onHidden], ['hide.bs.modal', onHide], ['hidePrevented.bs.modal', onHidePrevented]]);
  }, [onShown, onShow, onHidden, onHide, onHidePrevented]);
  useBootstrap(Modal, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

ModalComponent.displayName = 'Modal';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/offcanvas/">Bootstrap offcanvas component.</a>
 */

function OffcanvasComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    component,
    config,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.offcanvas', onShown], ['show.bs.offcanvas', onShow], ['hidden.bs.offcanvas', onHidden], ['hide.bs.offcanvas', onHide]]);
  }, [onShown, onShow, onHidden, onHide]);
  useBootstrap(Offcanvas, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

OffcanvasComponent.displayName = 'Offcanvas';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/popovers/">Bootstrap popover component.</a>
 */

function PopoverComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    onInserted,
    component,
    config,
    children,
    as: ElementType,
    renderTitle,
    renderContent,
    ...props
  } = _ref;
  const componentElement = useRef();
  const [tip, setTip] = useState();
  const wrappedOnInserted = useCallback(event => {
    const tip = Popover.getInstance(componentElement.current).getTipElement();

    if (renderTitle) {
      tip.querySelector('.popover-header').innerHTML = '';
    }

    if (renderContent) {
      tip.querySelector('.popover-body').innerHTML = '';
    }

    setTip(tip);

    if (onInserted) {
      onInserted(event);
    }
  }, [onInserted, renderTitle, renderContent]);
  const wrappedOnHide = useCallback(event => {
    setTip(null);

    if (onHide) {
      onHide(event);
    }
  }, [onHide]);
  const events = useMemo(() => {
    return new Map([['shown.bs.popover', onShown], ['show.bs.popover', onShow], ['hidden.bs.popover', onHidden], ['hide.bs.popover', wrappedOnHide], ['inserted.bs.popover', wrappedOnInserted]]);
  }, [onShown, onShow, onHidden, wrappedOnHide, wrappedOnInserted]);

  if (!config) {
    config = {};
  }

  if ((renderTitle || renderContent) && config.animation !== false) {
    config.animation = false;
  }

  useBootstrap(Popover, config, component, componentElement, events);

  if (renderTitle) {
    props.title = ' ';
  }

  if (renderContent) {
    props['data-bs-content'] = ' ';
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({
    ref: componentElement
  }, props), children, tip && renderTitle && /*#__PURE__*/ReactDOM.createPortal(renderTitle(Popover.getInstance(componentElement.current)), tip.querySelector('.popover-header')), tip && renderContent && /*#__PURE__*/ReactDOM.createPortal(renderContent(Popover.getInstance(componentElement.current)), tip.querySelector('.popover-body')));
}

PopoverComponent.defaultProps = {
  as: 'span'
};
PopoverComponent.displayName = 'Popover';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/navs-tabs/">Bootstrap tab component.</a>
 */

function TabComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    component,
    children,
    as: ElementType,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.tab', onShown], ['show.bs.tab', onShow], ['hidden.bs.tab', onHidden], ['hide.bs.tab', onHide]]);
  }, [onShown, onShow, onHidden, onHide]);
  useBootstrap(Tab, undefined, component, componentElement, events);
  return /*#__PURE__*/React.createElement(ElementType, _extends({
    ref: componentElement
  }, props), children);
}

TabComponent.defaultProps = {
  as: 'button'
};
TabComponent.displayName = 'Tab';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/toasts/">Bootstrap toast component.</a>
 */

function ToastComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    component,
    config,
    children,
    ...props
  } = _ref;
  const componentElement = useRef();
  const events = useMemo(() => {
    return new Map([['shown.bs.toast', onShown], ['show.bs.toast', onShow], ['hidden.bs.toast', onHidden], ['hide.bs.toast', onHide]]);
  }, [onShown, onShow, onHidden, onHide]);
  useBootstrap(Toast, config, component, componentElement, events);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: componentElement
  }, props), children);
}

ToastComponent.displayName = 'Toast';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/tooltips/">Bootstrap tooltip component.</a>
 */

function TooltipComponent(_ref) {
  let {
    onShown,
    onShow,
    onHidden,
    onHide,
    onInserted,
    component,
    config,
    children,
    as: ElementType,
    renderTitle,
    ...props
  } = _ref;
  const componentElement = useRef();
  const [tip, setTip] = useState();
  const wrappedOnInserted = useCallback(event => {
    const tip = Tooltip.getInstance(componentElement.current).getTipElement();
    const inner = tip.querySelector('.tooltip-inner');

    if (renderTitle) {
      inner.innerHTML = '';
    }

    setTip(inner);

    if (onInserted) {
      onInserted(event);
    }
  }, [onInserted, renderTitle]);
  const wrappedOnHide = useCallback(event => {
    setTip(null);

    if (onHide) {
      onHide(event);
    }
  }, [onHide]);
  const events = useMemo(() => {
    return new Map([['shown.bs.tooltip', onShown], ['show.bs.tooltip', onShow], ['hidden.bs.tooltip', onHidden], ['hide.bs.tooltip', wrappedOnHide], ['inserted.bs.tooltip', wrappedOnInserted]]);
  }, [onShown, onShow, onHidden, wrappedOnHide, wrappedOnInserted]);

  if (!config) {
    config = {};
  }

  if (renderTitle && config.animation !== false) {
    config.animation = false;
  }

  useBootstrap(Tooltip, config, component, componentElement, events);

  if (renderTitle) {
    props.title = ' ';
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({
    ref: componentElement
  }, props), children, tip && renderTitle && /*#__PURE__*/ReactDOM.createPortal(renderTitle(Tooltip.getInstance(componentElement.current)), tip));
}

TooltipComponent.defaultProps = {
  as: 'span'
};
TooltipComponent.displayName = 'Tooltip';

export { AlertComponent as Alert, CarouselComponent as Carousel, CollapseComponent as Collapse, DropdownComponent as Dropdown, ModalComponent as Modal, OffcanvasComponent as Offcanvas, PopoverComponent as Popover, TabComponent as Tab, ToastComponent as Toast, TooltipComponent as Tooltip };
//# sourceMappingURL=bs5-react-elements.esm.js.map
