jest.mock('bootstrap', () => {
  const bootstrapVersions = {
    '5.0': 'bootstrap5-0',
    '5.1': 'bootstrap5-1',
    '5.2': 'bootstrap5-2',
    'latest': 'bootstrap',
  };

  const version = process.env.BS_VERSION || 'latest';

  return jest.requireActual(bootstrapVersions[version]);
});
