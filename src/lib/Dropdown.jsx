import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/dropdowns/">Bootstrap dropdown component.</a>
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
   */
  onShown: PropTypes.func,
  /**
   * Handler for the show.bs.dropdown event
   */
  onShow: PropTypes.func,
  /**
   * Handler for the hidden.bs.dropdown event
   */
  onHidden: PropTypes.func,
  /**
   * Handler for the hide.bs.dropdown event
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
   * Dropdown contents
   */
  children: PropTypes.node,
  /**
   * The element type of the tooltip
   */
  as: PropTypes.elementType,
};

DropdownComponent.defaultProps = {
  as: 'button',
};

DropdownComponent.displayName = 'Dropdown';

export {DropdownComponent as Dropdown};
