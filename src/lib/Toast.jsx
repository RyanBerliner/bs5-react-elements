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
   * @since 0.2.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.toast event
   * @since 0.2.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.toast event
   * @since 0.2.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.toast event
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
   * Toast contents
   * @since 0.2.0
   */
  children: PropTypes.node,
};

ToastComponent.displayName = 'Toast';

export {ToastComponent as Toast};
