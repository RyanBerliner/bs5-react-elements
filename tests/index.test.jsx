import * as BS5ReactElements from '../src/lib/index';

describe('package index', () => {
  test('exports a named modal', () => {
    expect(BS5ReactElements.Modal).toBeTruthy();
  });

  test('exports a named tooltip', () => {
    expect(BS5ReactElements.Tooltip).toBeTruthy();
  });
});
