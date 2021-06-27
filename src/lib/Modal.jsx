import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/modal/">Bootstrap modal component.</a>
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
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.modal event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.modal event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.modal event
   */
  onHide: PropTypes.func,
  /**
   * Handler for the hidePrevented.bs.modal event
   */
  onHidePrevented: PropTypes.func,
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
   * Modal contents
   */
  children: PropTypes.node,
};

ModalComponent.displayName = 'Modal';

export {ModalComponent as Modal};
