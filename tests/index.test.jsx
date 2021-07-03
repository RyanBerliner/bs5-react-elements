import * as BS5ReactElements from '../src/lib/index';

describe('package index', () => {
  test('exports a named alert', () => {
    expect(BS5ReactElements.Alert).toBeTruthy();
  });

  test('exports a named dropdown', () => {
    expect(BS5ReactElements.Dropdown).toBeTruthy();
  });

  test('exports a named modal', () => {
    expect(BS5ReactElements.Modal).toBeTruthy();
  });

  test('exports a named offcanvas', () => {
    expect(BS5ReactElements.Offcanvas).toBeTruthy();
  });

  test('exports a named popover', () => {
    expect(BS5ReactElements.Popover).toBeTruthy();
  });

  test('exports a named toast', () => {
    expect(BS5ReactElements.Toast).toBeTruthy();
  });

  test('exports a named tooltip', () => {
    expect(BS5ReactElements.Tooltip).toBeTruthy();
  });
});
