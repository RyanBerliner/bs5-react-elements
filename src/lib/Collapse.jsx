import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.2/components/collapse/">Bootstrap collapse component.</a>
 */
function CollapseComponent({
  onShown,
  onShow,
  onHidden,
  onHide,
  component,
  config,
  children,
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.collapse', onShown],
      ['show.bs.collapse', onShow],
      ['hidden.bs.collapse', onHidden],
      ['hide.bs.collapse', onHide],
    ]);
  }, [onShown, onShow, onHidden, onHide]);

  useBootstrap(Collapse, config, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

CollapseComponent.propTypes = {
  /**
   * Handler for the shown.bs.collapse event
   * @since 0.2.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.collapse event
   * @since 0.2.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.collapse event
   * @since 0.2.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.collapse event
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
   * Component configuration
   * @since 0.2.0
   */
  config: PropTypes.object,
  /**
   * Collapse contents
   * @since 0.2.0
   */
  children: PropTypes.node,
};

CollapseComponent.displayName = 'Collapse';

export {CollapseComponent as Collapse};
