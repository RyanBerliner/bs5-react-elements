import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.3/components/dropdowns/">Bootstrap dropdown component.</a>
 */
function DropdownComponent({
  onShown,
  onShow,
  onHidden,
  onHide,
  component,
  config,
  children,
  as: ElementType,
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['shown.bs.dropdown', onShown],
      ['show.bs.dropdown', onShow],
      ['hidden.bs.dropdown', onHidden],
      ['hide.bs.dropdown', onHide],
    ]);
  }, [onShown, onShow, onHidden, onHide]);

  useBootstrap(Dropdown, config, component, componentElement, events);

  return (
    <ElementType ref={componentElement} {...props}>
      {children}
    </ElementType>
  );
}

DropdownComponent.propTypes = {
  /**
   * Handler for the shown.bs.dropdown event
   * @since 0.2.0
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.dropdown event
   * @since 0.2.0
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.dropdown event
   * @since 0.2.0
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.dropdown event
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
   * Dropdown contents
   * @since 0.2.0
   */
  children: PropTypes.node,
  /**
   * The element type of the dropdown
   * @since 0.2.0
   */
  as: PropTypes.elementType,
};

DropdownComponent.defaultProps = {
  as: 'button',
};

DropdownComponent.displayName = 'Dropdown';

export {DropdownComponent as Dropdown};
