import React, {useCallback, useEffect, useRef} from 'react';
import {Toast} from '../src/lib/Toast';
import {render} from '@testing-library/react';

/**
 * A boilerplate toast that starts out hidden
 */
function HiddenToast(props) {
  return <Toast
    className="toast hide"
    role="alert"
    {...props}
  >
    <div className="toast-header">
      <strong className="me-auto">Lorem ipsum</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"></button>
    </div>
    <div className="toast-body">
      Lorem ipsum dolor.
    </div>
  </Toast>;
}

/**
 * A boilerplate toast that starts out hidden, and shows itself on mount.
 */
function AppearingToast(props) {
  const component = useRef();

  useEffect(() => {
    component.current.show();
  }, []);

  return <HiddenToast component={component} {...props} />;
}

/**
 * A boilerplate toast that starts out hidden, shows itself, then hides itself.
 */
function FlashingToast(props) {
  const component = useRef();

  useEffect(() => {
    component.current.show();
  }, []);

  const hide = useCallback(() => {
    component.current.hide();
  });

  return <HiddenToast component={component} onShown={hide} {...props} />;
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.toast event bound to onShow prop', (done) => {
    /**
     * show.bs.toast event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<AppearingToast onShow={onShow} />);
  });

  test('shown.bs.toast event bound to onShown prop', (done) => {
    /**
     * shown.bs.toast event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<AppearingToast onShown={onShown} />);
  });

  test('hide.bs.toast event bound to onHide prop', (done) => {
    /**
     * hide.bs.toast event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<FlashingToast onHide={onHide} />);
  });

  test('hidden.bs.toast event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.toast event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<FlashingToast onHidden={onHidden} />);
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A toast that will call the bootstrap show() method immediately on mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <HiddenToast component={component} {...props} />;
    }

    /**
     * show.bs.toast event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * hide.bs.toast event handler.
     */
    function onHide() {
      setTimeout(() => done(), 500);
    }

    render(<AppearingToast config={{delay: 100}} onHide={onHide} />);
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Toast />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Toast>child</Toast>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Toast data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
