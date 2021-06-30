import React, {useRef, useMemo, useCallback} from 'react';
import {unmountComponentAtNode} from 'react-dom';
import PropTypes from 'prop-types';
import {Alert} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/alerts/">Bootstrap alert component.</a>
 */
function AlertComponent({
  onClosed,
  onClose,
  container,
  component,
  children,
  ...props
}) {
  const componentElement = useRef();

  const _onClosed = useCallback((event) => {
    unmountComponentAtNode(container.current);

    if (onClosed) {
      onClosed(event);
    }
  }, [onClosed]);

  const events = useMemo(() => {
    return new Map([
      ['closed.bs.alert', _onClosed],
      ['close.bs.alert', onClose],
    ]);
  }, [_onClosed, onClose]);

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
   */
  onClosed: PropTypes.func,
  /**
   * Handler for the close.bs.alert event
   */
  onClose: PropTypes.func,
  /**
   * React ref refering to the container the element is wrapped in
   */
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]).isRequired(),
  /**
   * React ref that will be assigned the component instance
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  /**
   * Alert contents
   */
  children: PropTypes.node,
};

AlertComponent.displayName = 'Alert';

export {AlertComponent as Alert};
