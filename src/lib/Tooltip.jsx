import React, {useRef, useMemo, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Tooltip} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.1/components/tooltips/">Bootstrap tooltip component.</a>
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
  renderTitle,
  ...props
}) {
  const componentElement = useRef();
  const [tip, setTip] = useState();

  const wrappedOnInserted = useCallback((event) => {
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

  const wrappedOnHide = useCallback((event) => {
    setTip(null);

    if (onHide) {
      onHide(event);
    }
  }, [onHide]);

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.tooltip', onShown],
      ['show.bs.tooltip', onShow],
      ['hidden.bs.tooltip', onHidden],
      ['hide.bs.tooltip', wrappedOnHide],
      ['inserted.bs.tooltip', wrappedOnInserted],
    ]);
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

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
      {(tip && renderTitle) && ReactDOM.createPortal(
          renderTitle(Tooltip.getInstance(componentElement.current)),
          tip,
      )}
    </ElementType>
  );
}

TooltipComponent.propTypes = {
  /**
   * Handler for the shown.bs.tooltip event
   * @since 0.1.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.tooltip event
   * @since 0.1.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.tooltip event
   * @since 0.1.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.tooltip event
   * @since 0.1.0
   */
  onHide: PropTypes.func,
  /**
   * Handler for the inserted.bs.tooltip event
   * @since 0.1.0
   */
  onInserted: PropTypes.func,
  /**
   * React ref that will be assigned the component instance
   * @since 0.1.0
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  /**
   * Component configuration
   * @since 0.1.0
   */
  config: PropTypes.object,
  /**
   * Tooltip contents
   * @since 0.1.0
   */
  children: PropTypes.node,
  /**
   * The element type of the tooltip
   * @since 0.1.0
   */
  as: PropTypes.elementType,
  /**
   * Render tooltip content as a react component
   * @since 2.0.0
   */
  renderTitle: PropTypes.func,
};

TooltipComponent.defaultProps = {
  as: 'span',
};

TooltipComponent.displayName = 'Tooltip';

export {TooltipComponent as Tooltip};
