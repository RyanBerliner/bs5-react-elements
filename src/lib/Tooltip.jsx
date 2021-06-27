import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/tooltips/">Bootstrap tooltip component.</a>
 */
function TooltipComponent({
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
      ['shown.bs.tooltip', onShown],
      ['show.bs.tooltip', onShow],
      ['hidden.bs.tooltip', onHidden],
      ['hide.bs.tooltip', onHide],
      ['inserted.bs.tooltip', onInserted],
    ]);
  }, [onShown, onShow, onHidden, onHide, onInserted]);

  useBootstrap(Tooltip, config, component, componentElement, events);

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
    </ElementType>
  );
}

TooltipComponent.propTypes = {
  /**
   * Handler for the shown.bs.tooltip event
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.tooltip event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.tooltip event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.tooltip event
   */
  onHide: PropTypes.func,
  /**
   * Handler for the inserted.bs.tooltip event
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
   * Tooltip contents
   */
  children: PropTypes.node,
  /**
   * The element type of the tooltip
   */
  as: PropTypes.elementType,
};

TooltipComponent.defaultProps = {
  as: 'span',
};

TooltipComponent.displayName = 'Tooltip';

export {TooltipComponent as Tooltip};
