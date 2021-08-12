import React, {useRef} from 'react';
import {useBootstrap} from '../src/lib/hooks';
import {render} from '@testing-library/react';

describe('use bootstrap hook', () => {
  test('disposes component on unmount', () => {
    const dispose = jest.fn();

    /**
     * Fake bootstrap component
     */
    class Component {
      /**
       * Mock bootstraps dispose, which calls our mock we can spy on
       */
      dispose() {
        dispose();
      }

      /**
       * Mock bootstraps getInstance
       */
      static getInstance() {
        return null;
      }
    };

    const events = new Map([]);
    const config = {};

    /**
     * React component that uses the useBootstrap hook
     */
    function TestComponent() {
      const ref = useRef();
      useBootstrap(Component, config, undefined, ref, events);
      return <span ref={ref}></span>;
    }

    const {unmount} = render(<TestComponent />);
    unmount();

    expect(dispose).toHaveBeenCalledTimes(1);
  });
});
