import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.0/components/carousel/">Bootstrap carousel component.</a>
 */
function CarouselComponent({
  onSlid,
  onSlide,
  component,
  config,
  children,
  ...props
}) {
  const componentElement = useRef();

  const events = useMemo(() => {
    return new Map([
      ['slid.bs.carousel', onSlid],
      ['slide.bs.carousel', onSlide],
    ]);
  }, [onSlid, onSlide]);

  useBootstrap(Carousel, config, component, componentElement, events);

  return (
    <div ref={componentElement} {...props}>
      {children}
    </div>
  );
}

CarouselComponent.propTypes = {
  /**
   * Handler for the slid.bs.carousel event
   */
  onSlid: PropTypes.func,
  /**
   * Handler for the slide.bs.carousel event
   */
  onSlide: PropTypes.func,
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
};

CarouselComponent.displayName = 'Carousel';

export {CarouselComponent as Carousel};
