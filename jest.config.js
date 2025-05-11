module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/', // Ignore the old src directory
    '__mocks__/', // Ignore mock files as test suites
  ],
  testMatch: [
    '**/gameLogic.test.ts' // Only run the game logic tests for now
  ],
};
