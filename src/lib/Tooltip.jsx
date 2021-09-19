import React, {useRef, useMemo, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
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
  renderTitle,
  ...props
}) {
  const componentElement = useRef();
  const [tip, setTip] = useState();

  const wrappedOnShow = useCallback((event) => {
    const tip = Tooltip.getInstance(componentElement.current).getTipElement();
    const inner = tip.querySelector('.tooltip-inner');

    if (renderTitle) {
      inner.innerHTML = '';
    }

    setTip(inner);

    if (onShow) {
      onShow(event);
    }
  }, [onShow, renderTitle]);

  const wrappedOnHide = useCallback((event) => {
    setTip(null);

    if (onHide) {
      onHide(event);
    }
  }, [onHide]);

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.tooltip', onShown],
      ['show.bs.tooltip', wrappedOnShow],
      ['hidden.bs.tooltip', onHidden],
      ['hide.bs.tooltip', wrappedOnHide],
      ['inserted.bs.tooltip', onInserted],
    ]);
  }, [onShown, wrappedOnShow, onHidden, wrappedOnHide, onInserted]);

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
  /**
   * Render tooltip content as a react component
   */
  renderTitle: PropTypes.func,
};

TooltipComponent.defaultProps = {
  as: 'span',
};

TooltipComponent.displayName = 'Tooltip';

export {TooltipComponent as Tooltip};
