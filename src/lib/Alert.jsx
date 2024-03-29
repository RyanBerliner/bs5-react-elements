import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.3/components/alerts/">Bootstrap alert component.</a>
 */
function AlertComponent({
  onClosed,
  onClose,
  component,
  children,
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['closed.bs.alert', onClosed],
      ['close.bs.alert', onClose],
    ]);
  }, [onClosed, onClose]);

  useBootstrap(Alert, undefined, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

AlertComponent.propTypes = {
  /**
   * Handler for the closed.bs.alert event
   * @since 0.2.0
   */
  onClosed: PropTypes.func,
  /**
   * Handler for the close.bs.alert event
   * @since 0.2.0
   */
  onClose: PropTypes.func,
  /**
   * React ref that will be assigned the component instance
   * @since 0.2.0
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  /**
   * Alert contents
   * @since 0.2.0
   */
  children: PropTypes.node,
};

AlertComponent.displayName = 'Alert';

export {AlertComponent as Alert};
