import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Tab} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.3/components/navs-tabs/">Bootstrap tab component.</a>
 */
function TabComponent({
  onShown,
  onShow,
  onHidden,
  onHide,
  component,
  children,
  as: ElementType = 'button',
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.tab', onShown],
      ['show.bs.tab', onShow],
      ['hidden.bs.tab', onHidden],
      ['hide.bs.tab', onHide],
    ]);
  }, [onShown, onShow, onHidden, onHide]);

  useBootstrap(Tab, undefined, component, componentElement, events);

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
    </ElementType>
  );
}

TabComponent.propTypes = {
  /**
   * Handler for the shown.bs.tab event
   * @since 0.2.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.tab event
   * @since 0.2.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.tab event
   * @since 0.2.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.tab event
   * @since 0.2.0
   */
  onHide: PropTypes.func,
  /**
   * React ref that will be assigned the component instance
   * @since 0.2.0
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  /**
   * Tab contents
   * @since 0.2.0
   */
  children: PropTypes.node,
  /**
   * The element type of the tab
   * @since 0.2.0
   */
  as: PropTypes.elementType,
};

TabComponent.displayName = 'Tab';

export {TabComponent as Tab};
