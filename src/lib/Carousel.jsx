import React, {useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'bootstrap';
import {useBootstrap} from './hooks.js';

/**
 * Wrapper for the <a href="https://getbootstrap.com/docs/5.2/components/carousel/">Bootstrap carousel component.</a>
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
   * @since 0.2.0
   */
  onSlid: PropTypes.func,
  /**
   * Handler for the slide.bs.carousel event
   * @since 0.2.0
   */
  onSlide: PropTypes.func,
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
};

CarouselComponent.displayName = 'Carousel';

export {CarouselComponent as Carousel};
