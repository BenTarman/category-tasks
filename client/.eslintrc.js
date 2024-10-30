module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:typescript-eslint/recommended'
    // other configurations...
  ],
  rules: {
    'react/react-in-jsx-scope': 'off' // Disable the rule
  },
  globals: {
    // Add any global variables here
  }
  // other configurations...
}
