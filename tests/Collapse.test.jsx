import React, {useEffect, useRef} from 'react';
import {Collapse} from '../src/lib/Collapse';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate collapse, collapsed on load, with a button to open it.
 */
function TestCollapse(props) {
  return <>
    <button
      data-bs-toggle="collapse"
      data-bs-target="#test-collapse"
      aria-expanded="false"
      aria-controls="test-collapse"
    >
      Toggle
    </button>
    <Collapse id="test-collapse" className="collapse" {...props}>
      Lorem ipsum dolor.
    </Collapse>
  </>;
}

/**
 * Toggles the test collapse.
 */
function toggle() {
  fireEvent.click(screen.getByText('Toggle'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.collapse event bound to onShow prop', (done) => {
    /**
     * show.bs.collapse event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestCollapse data-bs-toggle="false" onShow={onShow} />);
    toggle();
  });

  test('shown.bs.collapse event bound to onShown prop', (done) => {
    /**
     * shown.bs.collapse event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestCollapse data-bs-toggle="false" onShown={onShown} />);
    toggle();
  });

  test('hide.bs.collapse event bound to onHide prop', (done) => {
    /**
     * hide.bs.collapse event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(
        <TestCollapse
          data-bs-toggle="false"
          onShown={toggle}
          onHide={onHide}
        />,
    );
    toggle();
  });

  test('hidden.bs.collapse event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.collapse event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(
        <TestCollapse
          data-bs-toggle="false"
          onShown={toggle}
          onHidden={onHidden}
        />,
    );
    toggle();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A collapse that will call the bootstrap show() method immediately on
     * mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestCollapse
        data-bs-toggle="false"
        component={component}
        {...props}
      />;
    }

    /**
     * show.bs.collapse event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', () => {
    const {container} = render(<TestCollapse config={{toggle: false}} />);
    expect(container.querySelector('.collapsing')).toBeNull();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Collapse />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Collapse>child</Collapse>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Collapse data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
