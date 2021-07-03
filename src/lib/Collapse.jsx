import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Collapse} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/collapse/">Bootstrap collapse component.</a>
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
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.collapse event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.collapse event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.collapse event
   */
  onHide: PropTypes.func,
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
   * Collapse contents
   */
  children: PropTypes.node,
};

CollapseComponent.displayName = 'Collapse';

export {CollapseComponent as Collapse};
