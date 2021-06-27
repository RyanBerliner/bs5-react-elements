import {useEffect, useRef} from 'react';

/**
 * Hook to initialize a component, bind events, and expose bootstrap apis.
 *
 * @param {Object} Component Bootstrap component object (Modal, Tooltip, etc)
 * @param {Object} config (optional) Configuration object of the component
 * @param {Object} componentRef (optional) A ref to reference the component
 * @param {Object} domRef A ref pointing to the dom element of the component
 * @param {Map} events Mapping of bootstrap event names and function handlers
 */
export function useBootstrap(
    Component,
    config,
    componentRef,
    domRef,
    events,
) {
  const initialConfig = useRef(config);

  useEffect(() => {
    const component = Component.getInstance(domRef.current) ||
      new Component(domRef.current, initialConfig.current);
    if (componentRef) {
      componentRef.current = component;
    }

    return () => component.dispose();
  }, [Component, componentRef, domRef]);

  useEffect(() => {
    const el = domRef.current;
    events.forEach((value, key) => {
      el.addEventListener(key, value);
    });

    return () => {
      events.forEach((value, key) => {
        el.removeEventListener(key, value);
      });
    };
  }, [domRef, events]);
}
