import React, {useEffect, useRef, forwardRef} from 'react';
import {Tab} from '../src/lib/Tab';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate tabs widget, with 2 tabs.
 * Only spreads props onto the second tab.
 */
function TestTabs(props) {
  return <>
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item" role="presentation">
        <Tab
          className="nav-link active"
          id="tab-1"
          data-bs-toggle="tab"
          data-bs-target="#panel-1"
          type="button"
          role="tab"
          aria-controls="panel-1"
          aria-selected="true">Tab 1</Tab>
      </li>
      <li className="nav-item" role="presentation">
        <Tab
          className="nav-link"
          id="tab-2"
          data-bs-toggle="tab"
          data-bs-target="#panel-2"
          type="button"
          role="tab"
          aria-controls="panel-2"
          aria-selected="false"
          {...props}>Tab 2</Tab>
      </li>
    </ul>

    <div className="tab-content">
      <div
        className="tab-pane active"
        id="panel-1"
        role="tabpanel"
        aria-labelledby="tab-1">Lorem ispum 1</div>
      <div
        className="tab-pane"
        id="panel-2"
        role="tabpanel"
        aria-labelledby="tab-2">Lorem ipsum 2</div>
    </div>
  </>;
}

/**
 * Clicks a specific tab
 *
 * @param {integer} number The number of the tab to click
 */
function clickTab(number) {
  fireEvent.click(screen.getByText(`Tab ${number}`));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.tab event bound to onShow prop', (done) => {
    /**
     * show.bs.tab event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTabs onShow={onShow} />);
    clickTab(2);
  });

  test('shown.bs.tab event bound to onShown prop', (done) => {
    /**
     * shown.bs.tab event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestTabs onShown={onShown} />);
    clickTab(2);
  });

  test('hide.bs.tab event bound to onHide prop', (done) => {
    /**
     * hide.bs.tab event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    /**
     * shown.bs.tab event handler
     */
    function onShown() {
      clickTab(1);
    }

    render(<TestTabs onShown={onShown} onHide={onHide} />);
    clickTab(2);
  });

  test('hidden.bs.tab event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.tab event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    /**
     * shown.bs.tab event handler
     */
    function onShown() {
      clickTab(1);
    }

    render(<TestTabs onShown={onShown} onHidden={onHidden} />);
    clickTab(2);
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A tabs widget that will call the bootstrap show() method immediately on
     * mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestTabs component={component} {...props} />;
    }

    /**
     * show.bs.tab event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Tab />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Tab>child</Tab>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Tab data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('supports custom tagname by string', () => {
    const {container} = render(<Tab as="a" />);
    expect(container.innerHTML).toMatchSnapshot();
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

    const {container} = render(<Tab as={Link}>child</Tab>);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
