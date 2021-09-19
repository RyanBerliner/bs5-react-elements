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
  titleComponent: TitleComponent,
  ...props
}) {
  const componentElement = useRef();
  const [tip, setTip] = useState();

  const wrappedOnShow = useCallback(() => {
    const tip = Tooltip.getInstance(componentElement.current).getTipElement();
    const inner = tip.querySelector('.tooltip-inner');

    if (TitleComponent) {
      inner.innerHTML = '';
    }

    setTip(inner);

    if (onShow) {
      onShow();
    }
  }, [onShow, TitleComponent]);

  const wrappedHide = useCallback(() => {
    setTip(null);

    if (onHide) {
      onHide();
    }
  }, [onHide]);

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.tooltip', onShown],
      ['show.bs.tooltip', wrappedOnShow],
      ['hidden.bs.tooltip', onHidden],
      ['hide.bs.tooltip', wrappedHide],
      ['inserted.bs.tooltip', onInserted],
    ]);
  }, [onShown, wrappedOnShow, onHidden, wrappedHide, onInserted]);

  if (!config) {
    config = {};
  }

  if (TitleComponent && config.animation !== false) {
    config.animation = false;
  }

  useBootstrap(Tooltip, config, component, componentElement, events);

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
      {(tip && TitleComponent) && ReactDOM.createPortal(
          <TitleComponent
            component={Tooltip.getInstance(componentElement.current)}
          />,
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
};

TooltipComponent.defaultProps = {
  as: 'span',
};

TooltipComponent.displayName = 'Tooltip';

export {TooltipComponent as Tooltip};
