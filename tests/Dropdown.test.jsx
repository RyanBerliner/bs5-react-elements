import React, {useEffect, useRef, forwardRef} from 'react';
import {Dropdown} from '../src/lib/Dropdown';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * A boilerplate dropdown.
 */
function TestDropdown(props) {
  return <div className="dropdown">
    <Dropdown
      type="button"
      className="dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      id="test-dropdown"
      {...props}
    >
      Dropdown
    </Dropdown>
    <ul className="dropdown-menu" aria-labelledby="test-dropdown">
      <li><a className="dropdown-item" href="#">Lorem ipsum #1</a></li>
      <li><a className="dropdown-item" href="#">Lorem ipsum #2</a></li>
    </ul>
  </div>;
}

/**
 * Clicks the dropdown trigger
 */
function clickTrigger() {
  fireEvent.click(screen.getByText('Dropdown'));
}

// Timeouts are used to prevent disposing of bootstrap components that are in
// the middle of a transition. This is a bootstrap bug. TODO: Submit an issue.

describe('events bound to props', () => {
  test('show.bs.dropdown event bound to onShow prop', (done) => {
    /**
     * show.bs.dropdown event handler.
     *
     * @param {Object} event
     */
    function onShow(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestDropdown onShow={onShow} />);
    clickTrigger();
  });

  test('shown.bs.dropdown event bound to onShown prop', (done) => {
    /**
     * shown.bs.dropdown event handler.
     *
     * @param {Object} event
     */
    function onShown(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestDropdown onShown={onShown} />);
    clickTrigger();
  });

  test('hide.bs.dropdown event bound to onHide prop', (done) => {
    /**
     * hide.bs.dropdown event handler.
     *
     * @param {Object} event
     */
    function onHide(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestDropdown onShown={clickTrigger} onHide={onHide} />);
    clickTrigger();
  });

  test('hidden.bs.dropdown event bound to onHidden prop', (done) => {
    /**
     * hidden.bs.dropdown event handler.
     *
     * @param {Object} event
     */
    function onHidden(event) {
      expect(event).toBeTruthy();
      setTimeout(() => done(), 500);
    }

    render(<TestDropdown onShown={clickTrigger} onHidden={onHidden} />);
    clickTrigger();
  });
});

describe('bootstrap apis', () => {
  test('component object exposed', (done) => {
    /**
     * A dropdown that will call the bootstrap show() method immediately on
     * mount.
     */
    function TestComponent(props) {
      const component = useRef();
      useEffect(() => component.current.show());
      return <TestDropdown component={component} {...props} />;
    }

    /**
     * show.bs.dropdown event handler.
     */
    function onShow() {
      setTimeout(() => done(), 500);
    }

    render(<TestComponent onShow={onShow} />);
  });

  test('config prop passed to component', (done) => {
    /**
     * shown.bs.dropdown event handler.
     */
    function onShown() {
      fireEvent.click(screen.getByText('Lorem ipsum #1'));
      expect(container.querySelector('.dropdown-menu.show')).toBeTruthy();
      done();
    }

    const {container} = render(
        <TestDropdown
          onShown={onShown}
          config={{autoClose: false}}
        />,
    );
    clickTrigger();
  });
});

describe('markup', () => {
  test('minimum markup renders as expected', () => {
    const {container} = render(<Dropdown />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('places children in correct element', () => {
    const {container} = render(<Dropdown>child</Dropdown>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('support additional attributes, place them correctly', () => {
    const {container} = render(<Dropdown data-lorem="ipsum" />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('supports custom tagname by string', () => {
    const {container} = render(<Dropdown as="a" />);
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

    const {container} = render(<Dropdown as={Link}>child</Dropdown>);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
