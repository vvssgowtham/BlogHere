module.exports = {
  // Specify the environment
  env: {
    browser: true,
    es2021: true,
  },
  // Extend recommended configurations
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  // Specify the parser options
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false, // Disable config file checking
  },
  // Specify the plugins
  plugins: [
    'react',
    'jsx-a11y',
  ],
  // Define the rules
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    'react/react-in-jsx-scope': 'off', // Turn off React in scope rule for React 17+
    'react/jsx-uses-react': 'off', // Turn off React usage in JSX rule for React 17+
    'react/jsx-uses-vars': 'warn', // Warn on unused variables in JSX
  },
  // Settings for React version
  settings: {
    react: {
      version: 'detect',
    },
  },
};