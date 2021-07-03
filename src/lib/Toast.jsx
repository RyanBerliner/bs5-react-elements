import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Toast} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/toasts/">Bootstrap toast component.</a>
 */
function ToastComponent({
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
      ['shown.bs.toast', onShown],
      ['show.bs.toast', onShow],
      ['hidden.bs.toast', onHidden],
      ['hide.bs.toast', onHide],
    ]);
  }, [onShown, onShow, onHidden, onHide]);

  useBootstrap(Toast, config, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

ToastComponent.propTypes = {
  /**
   * Handler for the shown.bs.toast event
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.toast event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.toast event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.toast event
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
   * Toast contents
   */
  children: PropTypes.node,
};

ToastComponent.displayName = 'Toast';

export {ToastComponent as Toast};
