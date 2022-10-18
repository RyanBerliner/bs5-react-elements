import React, {useEffect, useRef, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {Popover} from '../src/lib/Popover';
import {majorMinor} from './utils';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate popover.
 */
function TestPopover(props) {
  return <Popover
    title="Lorem ipsum"
    data-bs-content="Lorem ipsum dolor."
    data-bs-toggle="popover"
    {...props}
  >
    Test popover
  </Popover>;
}

/**
 * Test component for mounting in render props of popovers
 */
function TestComponent(props) {
  return <strong>Lorem ipsum</strong>;
}

/**
 * Clicks the test test popover.
 */
function clickPopover() {
  fireEvent.click(screen.getByText('Test popover'));
}

/**
 * Clicks the test popover after a small delay (literally minimal)
 */
function delayedClickPopover() {
  setTimeout(() =>{
    fireEvent.click(screen.getByText('Test popover'));
  });
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.popover event bound to onShow prop', (done) => {
    /**
     * show.bs.popover event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestPopover onShow={onShow} />);
    clickPopover();
  });

  test('shown.bs.popover event bound to onShown prop', (done) => {
    /**
     * shown.bs.popover event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestPopover onShown={onShown} />);
    clickPopover();
  });

  test('hide.bs.popover event bound to onHide prop', (done) => {
    /**
     * hide.bs.popover event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestPopover onShown={clickPopover} onHide={onHide} />);
    clickPopover();
  });

  test('hidden.bs.popover event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.popover event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestPopover onShown={clickPopover} onHidden={onHidden} />);
    clickPopover();
  });

  test('inserted.bs.popover event bound to onInserted prop', (done) => {
    /**
     * inserted.bs.popover event handler.
     *
     * @param {Object} event
     */
    function onInserted(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestPopover onInserted={onInserted} />);
    clickPopover();
  });
});

describe('render title', () => {
  test('properly mounts react component in title', (done) => {
    /**
     * On inserted handler that verifys popover content
     */
    function onInserted() {
      setTimeout(() => {
        const popoverHeader = document.querySelector('.popover-header');
        expect(popoverHeader.innerHTML).toBe('<strong>Lorem ipsum</strong>');
        done();
      });
    }

    render(
        <TestPopover
          onInserted={onInserted}
          renderTitle={() => <TestComponent />}
        />,
    );
    clickPopover();
  });

  test('properly unmounts react component in popover', (done) => {
    render(
        <TestPopover
          onInserted={delayedClickPopover}
          onHidden={() => done()}
          renderTitle={() => <TestComponent />}
        />,
    );
    clickPopover();
  });
});

describe('render content', () => {
  test('properly mounts react component in content', (done) => {
    /**
     * On inserted handler that verifys popover content
     */
    function onInserted() {
      setTimeout(() => {
        const popoverBody = document.querySelector('.popover-body');
        expect(popoverBody.innerHTML).toBe('<strong>Lorem ipsum</strong>');
        done();
      });
    }

    render(
        <TestPopover
          onInserted={onInserted}
          renderContent={() => <TestComponent />}
        />,
    );
    clickPopover();
  });

  test('properly unmounts react component in popover', (done) => {
    render(
        <TestPopover
          onInserted={delayedClickPopover}
          onHidden={() => done()}
          renderContent={() => <TestComponent />}
        />,
    );
    clickPopover();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A popover that will call the bootstrap show() method
     * immediately on mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestPopover component={component} {...props} />;
    }

    /**
     * show.bs.popover event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * Confirm the placement of the popover is bottom.
     */
    function confirmPlacement() {
      const bottomPlacementPopover =
        document.querySelector('[data-popper-placement="bottom"]');
      expect(bottomPlacementPopover).not.toBeNull();
      setTimeout(() => done(), 500);
    }

    render(
        <TestPopover
          config={{placement: 'bottom'}}
          onShown={confirmPlacement}
        />,
    );
    clickPopover();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Popover />);
    const snapshots = {
      '5.2': `"<span></span>"`,
      '5.1': `"<span data-bs-original-title=\\"\\" title=\\"\\"></span>"`,
      '5.0': `"<span data-bs-original-title=\\"\\" title=\\"\\"></span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('places children in correct element', () => {
    const {container} = render(<Popover>child</Popover>);
    const snapshots = {
      '5.2': `"<span>child</span>"`,
      '5.1': `"<span data-bs-original-title=\\"\\" title=\\"\\">child</span>"`,
      '5.0': `"<span data-bs-original-title=\\"\\" title=\\"\\">child</span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Popover data-lorem="ipsum" />);
    const snapshots = {
      '5.2': `"<span data-lorem=\\"ipsum\\"></span>"`,
      // eslint-disable-next-line max-len
      '5.1': `"<span data-lorem=\\"ipsum\\" data-bs-original-title=\\"\\" title=\\"\\"></span>"`,
      // eslint-disable-next-line max-len
      '5.0': `"<span data-lorem=\\"ipsum\\" data-bs-original-title=\\"\\" title=\\"\\"></span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('supports custom tagname by string', () => {
    const {container} = render(<Popover as="button" />);
    const snapshots = {
      '5.2': `"<button></button>"`,
      '5.1': `"<button data-bs-original-title=\\"\\" title=\\"\\"></button>"`,
      '5.0': `"<button data-bs-original-title=\\"\\" title=\\"\\"></button>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('support custom tagname with components supporting ref forwards', () => {
    /**
     * A component that renders a link, and importantly supports ref forwarding.
     */
    const Link = forwardRef((props, ref) => {
      const {children, ...rest} = props;
      return <a ref={ref} {...rest}>{children}</a>;
    });

    Link.displayName = 'Link';

    Link.propTypes = {
      children: PropTypes.node,
    };

    const {container} = render(<Popover as={Link}>child</Popover>);
    const snapshots = {
      '5.2': `"<a>child</a>"`,
      '5.1': `"<a data-bs-original-title=\\"\\" title=\\"\\">child</a>"`,
      '5.0': `"<a data-bs-original-title=\\"\\" title=\\"\\">child</a>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });
});
