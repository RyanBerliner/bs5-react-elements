import React, {useEffect, useRef} from 'react';
import {Carousel} from '../src/lib/Carousel';
import {render, fireEvent} from '@testing-library/react';

/**
 * A boilerplate carousel.
 */
function TestCarousel(props) {
  return <Carousel
    id="test-carousel"
    className="carousel slide"
    data-bs-ride="carousel"
    {...props}
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        Lorem ipsum 1
      </div>
      <div className="carousel-item">
        Lorem ipsum 2
      </div>
      <div className="carousel-item">
        Lorem ipsum 3
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#test-carousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#test-carousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </Carousel>;
}

/**
 * Clicks the next slide control
 */
function nextSlide() {
  fireEvent.click(document.querySelector('[data-bs-slide="next"]'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('slide.bs.carousel event bound to onSlide prop', (done) => {
    /**
     * slide.bs.carousel event handler.
     *
     * @param {Object} event
     */
    function onSlide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestCarousel onSlide={onSlide} />);
    nextSlide();
  });

  test('slid.bs.carousel event bound to onShown prop', (done) => {
    /**
     * slid.bs.carousel event handler.
     *
     * @param {Object} event
     */
    function onSlid(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestCarousel onSlid={onSlid} />);
    nextSlide();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A carousel that will call the bootstrap next() method immediately on
     * mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.next());
      return <TestCarousel component={component} {...props} />;
    }

    /**
     * slide.bs.carousel event handler.
     */
    function onSlide() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onSlide={onSlide} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * Go to next slide
     */
    const _nextSlide = jest.fn().mockImplementation(nextSlide);

    render(
        <TestCarousel
          config={{wrap: false}}
          onSlid={_nextSlide}
        />,
    );

    nextSlide();

    // HACK: Can't think of a better way at the moment to know when the
    // "next slide" is not longer going to be called.
    setTimeout(() => {
      expect(_nextSlide.mock.calls.length).toBe(2);
      done();
    }, 2000);
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Carousel />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Carousel>child</Carousel>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Carousel data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
