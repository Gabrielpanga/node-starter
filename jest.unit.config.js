module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: './tests/unit/.*.test.ts$',
  moduleNameMapper: {
    "^@controllers(.*)$": "<rootDir>/src/controllers$1",
    "^@models(.*)$": "<rootDir>/src/models$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@db(.*)$": "<rootDir>/src/db$1",
    "^@config(.*)$": "<rootDir>/src/config$1",
    "^@server(.*)$": "<rootDir>/src/server$1"
  },
  reporters: [ "default", "jest-junit" ]
};