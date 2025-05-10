// Set up global mocks that need to be applied before tests run

// Mock the Animation API
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');

  // Mock Animated module
  reactNative.Animated = {
    ...reactNative.Animated,
    Value: jest.fn(initial => ({
      setValue: jest.fn(),
      interpolate: jest.fn(),
      value: initial,
    })),
    timing: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
    spring: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
    parallel: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
    View: reactNative.Animated.View,
    Text: reactNative.Animated.Text,
  };

  return reactNative;
});

// Mock useRef implementation
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useRef: jest.fn(val => ({
      current: {
        setValue: jest.fn(),
        ...val,
      },
    })),
  };
});