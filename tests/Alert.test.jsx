import React, {useEffect, useRef} from 'react';
import {Alert} from '../src/lib/Alert';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate alert.
 */
function TestAlert(props) {
  const container = useRef();

  return <div ref={container}>
    <Alert
      role="alert"
      className="alert alert-primary alert-dismissible fade show"
      container={container}
      {...props}
    >
      Test alert
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"></button>
    </Alert>
  </div>;
}

/**
 * Clicks close on the test alert.
 */
function closeAlert() {
  fireEvent.click(document.body.querySelector('[data-bs-dismiss="alert"]'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('close.bs.alert event bound to onClose prop', (done) => {
    /**
     * close.bs.alert event handler.
     *
     * @param {Object} event
     */
    function onClose(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestAlert onClose={onClose} />);
    closeAlert();
  });

  test('closed.bs.alert event bound to onClosed prop', (done) => {
    /**
     * closed.bs.alert event handler.
     *
     * @param {Object} event
     */
    function onClosed(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestAlert onClosed={onClosed} />);
    closeAlert();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * An alert that will call the bootstrap close() method
     * immediately on mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.close());
      return <TestAlert component={component} {...props} />;
    }

    /**
     * close.bs.alert event handler.
     */
    function onClose() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onClose={onClose} />);
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Alert />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Alert>child</Alert>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Alert data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
