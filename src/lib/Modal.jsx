import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.3/components/modal/">Bootstrap modal component.</a>
 */
function ModalComponent({
  onShown,
  onShow,
  onHidden,
  onHide,
  onHidePrevented,
  component,
  config,
  children,
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.modal', onShown],
      ['show.bs.modal', onShow],
      ['hidden.bs.modal', onHidden],
      ['hide.bs.modal', onHide],
      ['hidePrevented.bs.modal', onHidePrevented],
    ]);
  }, [onShown, onShow, onHidden, onHide, onHidePrevented]);

  useBootstrap(Modal, config, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

ModalComponent.propTypes = {
  /**
   * Handler for the shown.bs.modal event
   * @since 0.1.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.modal event
   * @since 0.1.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.modal event
   * @since 0.1.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.modal event
   * @since 0.1.0
   */
  onHide: PropTypes.func,
  /**
   * Handler for the hidePrevented.bs.modal event
   * @since 0.1.0
   */
  onHidePrevented: PropTypes.func,
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
   * Modal contents
   * @since 0.1.0
   */
  children: PropTypes.node,
};

ModalComponent.displayName = 'Modal';

export {ModalComponent as Modal};
