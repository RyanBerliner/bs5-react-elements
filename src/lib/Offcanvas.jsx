import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Offcanvas} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.3/components/offcanvas/">Bootstrap offcanvas component.</a>
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
   * @since 0.2.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.offcanvas event
   * @since 0.2.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.offcanvas event
   * @since 0.2.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.offcanvas event
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
   * Offcanvas contents
   * @since 0.2.0
   */
  children: PropTypes.node,
};

OffcanvasComponent.displayName = 'Offcanvas';

export {OffcanvasComponent as Offcanvas};
