import React, {useEffect, useRef} from 'react';
import {Modal as BSModal} from 'bootstrap';
import {Modal} from '../src/lib/Modal';
import {minor} from './utils';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate modal with a button to open it.
 */
function TestModal(props) {
  return <>
    <button data-bs-toggle="modal" data-bs-target="#test-modal">
      Launch
    </button>
    <Modal
      className="modal fade"
      id="test-modal"
      tabIndex="-1"
      aria-hidden="true"
      {...props}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <button data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </Modal>
  </>;
}

/**
 * Launches the test modal.
 */
function launch() {
  fireEvent.click(screen.getByText('Launch'));
}

/**
 * Attempts to close the test modal by clicking the close button.
 */
function close() {
  fireEvent.click(screen.getByText('Close'));
}

/**
 * Attempts to close the modal by clicking the modal backdrop.
 */
function backdropClick() {
  // Bootstrap changes from click to mousedown events in https://github.com/twbs/bootstrap/pull/36401
  const event = minor >= 2 ? 'mouseDown' : 'click';
  fireEvent[event](document.querySelector('.modal'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.modal event bound to onShow prop', (done) => {
    /**
     * show.bs.modal event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestModal onShow={onShow} />);
    launch();
  });

  test('shown.bs.modal event bound to onShown prop', (done) => {
    /**
     * shown.bs.modal event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestModal onShown={onShown} />);
    launch();
  });

  test('hide.bs.modal event bound to onHide prop', (done) => {
    /**
     * hide.bs.modal event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestModal onShown={close} onHide={onHide} />);
    launch();
  });

  test('hidden.bs.modal event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.modal event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestModal onShown={close} onHidden={onHidden} />);
    launch();
  });

  test('hidePrevented.bs.modal event bound to onHidePrevented prop', (done) => {
    /**
     * hidePrevented.bs.modal event handler.
     *
     * @param {Object} event
     */
    function onHidePrevented(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(
        <TestModal
          data-bs-backdrop="static"
          onShown={backdropClick}
          onHidePrevented={onHidePrevented}
        />,
    );
    launch();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A modal that will call the bootstrap show() method immediately on mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestModal component={component} {...props} />;
    }

    /**
     * show.bs.modal event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * hidePrevented.bs.modal event handler.
     */
    function onHidePrevented() {
      setTimeout(() => done(), 500);
    }

    render(
        <TestModal
          config={{backdrop: 'static'}}
          onShown={backdropClick}
          onHidePrevented={onHidePrevented}
        />,
    );
    launch();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Modal />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Modal>child</Modal>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Modal data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
