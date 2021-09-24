import React, {useRef, useMemo, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Popover} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/popovers/">Bootstrap popover component.</a>
 */
function PopoverComponent({
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
}) {
  const componentElement = useRef();
  const [tip, setTip] = useState();

  const wrappedOnInserted = useCallback((event) => {
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

  const wrappedOnHide = useCallback((event) => {
    setTip(null);

    if (onHide) {
      onHide(event);
    }
  }, [onHide]);

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.popover', onShown],
      ['show.bs.popover', onShow],
      ['hidden.bs.popover', onHidden],
      ['hide.bs.popover', wrappedOnHide],
      ['inserted.bs.popover', wrappedOnInserted],
    ]);
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

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
      {(tip && renderTitle) && ReactDOM.createPortal(
          renderTitle(Popover.getInstance(componentElement.current)),
          tip.querySelector('.popover-header'),
      )}
      {(tip && renderContent) && ReactDOM.createPortal(
          renderContent(Popover.getInstance(componentElement.current)),
          tip.querySelector('.popover-body'),
      )}
    </ElementType>
  );
}

PopoverComponent.propTypes = {
  /**
   * Handler for the shown.bs.popover event
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.popover event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.popover event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.popover event
   */
  onHide: PropTypes.func,
  /**
   * Handler for the inserted.bs.popover event
   */
  onInserted: PropTypes.func,
  /**
   * React ref that will be assigned the component instance
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  /**
   * Component configuration
   */
  config: PropTypes.object,
  /**
   * Popover contents
   */
  children: PropTypes.node,
  /**
   * The element type of the popover
   */
  as: PropTypes.elementType,
  /**
   * Render popover title as a react component
   */
  renderTitle: PropTypes.func,
  /**
   * Render popover content as a react component
   */
  renderContent: PropTypes.func,
};

PopoverComponent.defaultProps = {
  as: 'span',
};

PopoverComponent.displayName = 'Popover';

export {PopoverComponent as Popover};
