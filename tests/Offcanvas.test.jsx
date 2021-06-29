import React, {useEffect, useRef} from 'react';
import {Offcanvas} from '../src/lib/Offcanvas';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate offcanvas with a button to open it.
 */
function TestOffcanvas(props) {
  return <>
    <button data-bs-toggle="offcanvas" data-bs-target="#test-offcanvas">
      Launch
    </button>
    <Offcanvas
      className="offcanvas offcanvas-start"
      id="test-offcanvas"
      tabIndex="-1"
      aria-hidden="true"
      {...props}
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        Lorem ipsum
      </div>
    </Offcanvas>
  </>;
}

/**
 * Launches the test offcanvas.
 */
function launch() {
  fireEvent.click(screen.getByText('Launch'));
}

/**
 * Close the test offcanvas by clicking the close button.
 */
function close() {
  fireEvent.click(document.body.querySelector('[aria-label="Close"]'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.offcanvas event bound to onShow prop', (done) => {
    /**
     * show.bs.offcanvas event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestOffcanvas onShow={onShow} />);
    launch();
  });

  test('shown.bs.offcanvas event bound to onShown prop', (done) => {
    /**
     * shown.bs.offcanvas event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestOffcanvas onShown={onShown} />);
    launch();
  });

  test('hide.bs.offcanvas event bound to onHide prop', (done) => {
    /**
     * hide.bs.offcanvas event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestOffcanvas onShown={close} onHide={onHide} />);
    launch();
  });

  test('hidden.bs.offcanvas event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.offcanvas event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestOffcanvas onShown={close} onHidden={onHidden} />);
    launch();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * An offcanvas that will call the bootstrap show() method immediately on
     * mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestOffcanvas component={component} {...props} />;
    }

    /**
     * show.bs.offcanvas event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * onShown.bs.offcanvas event handler. Make sure there is no backdrop
     * which means that the config works.
     */
    function onShown() {
      expect(document.body.querySelector('.modal-backdrop')).toBeNull();
      done();
    }

    render(
        <TestOffcanvas
          config={{backdrop: false}}
          onShown={onShown}
        />,
    );
    launch();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Offcanvas />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Offcanvas>child</Offcanvas>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Offcanvas data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
