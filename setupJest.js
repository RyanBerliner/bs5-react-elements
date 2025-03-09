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


jest.mock('react', () => {
  const reactVersion = process.env.REACT_VERSION || 'latest';

  const reactVersions = {
    '17': 'react17',
    '18': 'react18',
    'latest': 'react',
  };

  return jest.requireActual(reactVersions[reactVersion]);
});

jest.mock('react-dom', () => {
  const reactVersion = process.env.REACT_VERSION || 'latest';

  const reactDOMVersions = {
    '17': 'react-dom17',
    '18': 'react-dom18',
    'latest': 'react-dom',
  };

  return jest.requireActual(reactDOMVersions[reactVersion]);
});
