module.exports =  {
  "roots": [
    "<rootDir>/src"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  "moduleNameMapper": {
    "@actions(.*)$": "<rootDir>/src/actions/$1",
    "@components(.*)$": "<rootDir>/src/components/$1",
    "@constants/(.*)$": "<rootDir>/src/constants/$1",
    "@containers(.*)$": "<rootDir>/src/containers/$1",
    "@img(.*)$": "<rootDir>/src/img/$1",
    "@reducers(.*)$": "<rootDir>/src/reducers/$1",
    "@selectors(.*)$": "<rootDir>/src/selectors/$1",
    "@utils(.*)$": "<rootDir>/src/utils/$1",
    "bignumber.js": "<rootDir>/node_modules/bignumber.js/bignumber.js",
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "moduleDirectories": [
    ".",
    "src",
    "src/actions",
    "src/components",
    "src/constants",
    "src/containers",
    "src/img",
    "src/reducers",
    "src/utils",
    "node_modules"
  ],
  "resolver": "jest-pnp-resolver",
  "setupFiles": [
    "react-app-polyfill/jsdom",
    "jest-localstorage-mock"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.tsx"
  ],
  "testEnvironment": "jsdom",
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  "testURL": "http://localhost",
  "timers": "fake",
  "transform": {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ]
};
