import React, {useEffect, useRef, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from '../src/lib/Tooltip';
import {majorMinor} from './utils';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate tooltip.
 */
function TestTooltip(props) {
  return <Tooltip
    title="Lorem ipsum"
    data-bs-toggle="tooltip"
    {...props}
  >
    Test tooltip
  </Tooltip>;
}

/**
 * Hovers over the test tooltip.
 */
function hoverTooltip() {
  fireEvent.mouseOver(screen.getByText('Test tooltip'));
}

/**
 * Un-Hovers over the test tooltip.
 */
function unHoverTooltip() {
  fireEvent.mouseOut(screen.getByText('Test tooltip'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.tooltip event bound to onShow prop', (done) => {
    /**
     * show.bs.tooltip event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTooltip onShow={onShow} />);
    hoverTooltip();
  });

  test('shown.bs.tooltip event bound to onShown prop', (done) => {
    /**
     * shown.bs.tooltip event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTooltip onShown={onShown} />);
    hoverTooltip();
  });

  test('hide.bs.tooltip event bound to onHide prop', (done) => {
    /**
     * hide.bs.tooltip event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTooltip onShown={unHoverTooltip} onHide={onHide} />);
    hoverTooltip();
  });

  test('hidden.bs.tooltip event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.tooltip event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTooltip onShown={unHoverTooltip} onHidden={onHidden} />);
    hoverTooltip();
  });

  test('inserted.bs.tooltip event bound to onInserted prop', (done) => {
    /**
     * inserted.bs.tooltip event handler.
     *
     * @param {Object} event
     */
    function onInserted(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTooltip onInserted={onInserted} />);
    hoverTooltip();
  });
});

describe('render title', () => {
  /**
   * Test component for mounting in renderTitle of tooltips
   */
  function TestComponent(props) {
    return <strong>Lorem ipsum</strong>;
  }

  test('properly mounts react component in tooltip', (done) => {
    /**
     * On inserted handler that verifys tooltip content
     */
    function onInserted() {
      setTimeout(() => {
        const tooltipInner = document.querySelector('.tooltip-inner');
        expect(tooltipInner.innerHTML).toBe('<strong>Lorem ipsum</strong>');
        done();
      });
    }

    render(
        <TestTooltip
          onInserted={onInserted}
          renderTitle={() => <TestComponent />}
        />,
    );
    hoverTooltip();
  });

  test('properly unmounts react component in tooltip', (done) => {
    render(
        <TestTooltip
          onInserted={unHoverTooltip}
          onHidden={() => done()}
          renderTitle={() => <TestComponent />}
        />,
    );
    hoverTooltip();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A tooltip that will call the bootstrap show() method
     * immediately on mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestTooltip component={component} {...props} />;
    }

    /**
     * show.bs.tooltip event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * Confirm the placement of the tooltip is bottom.
     */
    function confirmPlacement() {
      const bottomPlacementTooltip =
        document.querySelector('[data-popper-placement="bottom"]');
      expect(bottomPlacementTooltip).not.toBeNull();
      setTimeout(() => done(), 500);
    }

    render(
        <TestTooltip
          config={{placement: 'bottom'}}
          onShown={confirmPlacement}
        />,
    );
    hoverTooltip();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Tooltip />);
    const snapshots = {
      '5.3': `"<span></span>"`,
      '5.2': `"<span></span>"`,
      '5.1': `"<span data-bs-original-title="" title=""></span>"`,
      '5.0': `"<span data-bs-original-title="" title=""></span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('places children in correct element', () => {
    const {container} = render(<Tooltip>child</Tooltip>);
    const snapshots = {
      '5.3': `"<span>child</span>"`,
      '5.2': `"<span>child</span>"`,
      '5.1': `"<span data-bs-original-title="" title="">child</span>"`,
      '5.0': `"<span data-bs-original-title="" title="">child</span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Tooltip data-lorem="ipsum" />);
    const snapshots = {
      '5.3': `"<span data-lorem="ipsum"></span>"`,
      '5.2': `"<span data-lorem="ipsum"></span>"`,
      // eslint-disable-next-line max-len
      '5.1': `"<span data-lorem="ipsum" data-bs-original-title="" title=""></span>"`,
      // eslint-disable-next-line max-len
      '5.0': `"<span data-lorem="ipsum" data-bs-original-title="" title=""></span>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });

  test('supports custom tagname by string', () => {
    const {container} = render(<Tooltip as="button" />);
    const snapshots = {
      '5.3': `"<button></button>"`,
      '5.2': `"<button></button>"`,
      '5.1': `"<button data-bs-original-title="" title=""></button>"`,
      '5.0': `"<button data-bs-original-title="" title=""></button>"`,
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

    const {container} = render(<Tooltip as={Link}>child</Tooltip>);
    const snapshots = {
      '5.3': `"<a>child</a>"`,
      '5.2': `"<a>child</a>"`,
      '5.1': `"<a data-bs-original-title="" title="">child</a>"`,
      '5.0': `"<a data-bs-original-title="" title="">child</a>"`,
    };

    expect(container.innerHTML).toMatchInlineSnapshot(snapshots[majorMinor]);
  });
});
