import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Offcanvas} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/offcanvas/">Bootstrap offcanvas component.</a>
 */
function OffcanvasComponent({
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
      ['shown.bs.offcanvas', onShown],
      ['show.bs.offcanvas', onShow],
      ['hidden.bs.offcanvas', onHidden],
      ['hide.bs.offcanvas', onHide],
    ]);
  }, [onShown, onShow, onHidden, onHide]);

  useBootstrap(Offcanvas, config, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

OffcanvasComponent.propTypes = {
  /**
   * Handler for the shown.bs.offcanvas event
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.offcanvas event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.offcanvas event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.offcanvas event
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
   * Offcanvas contents
   */
  children: PropTypes.node,
};

OffcanvasComponent.displayName = 'Offcanvas';

export {OffcanvasComponent as Offcanvas};
