import React, {useRef, useMemo} from 'react';
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
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.popover', onShown],
      ['show.bs.popover', onShow],
      ['hidden.bs.popover', onHidden],
      ['hide.bs.popover', onHide],
      ['inserted.bs.popover', onInserted],
    ]);
  }, [onShown, onShow, onHidden, onHide, onInserted]);

  useBootstrap(Popover, config, component, componentElement, events);

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
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
};

PopoverComponent.defaultProps = {
  as: 'span',
};

PopoverComponent.displayName = 'Popover';

export {PopoverComponent as Popover};
