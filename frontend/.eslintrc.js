module.exports = {
    extends: [
      'plugin:react/recommended',
      'plugin:import/typescript',
      'airbnb-typescript-prettier',
    ],
    parserOptions: {
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      project: './tsconfig.json',
      tsConfigRootDir: './',
      sourceType: 'module',
    },
    plugins: ['react', 'import'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          paths: ['src'],
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
        },
      }
    },
    rules: {
      "prefer-regex-literals": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      'no-shadow': 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.*', '**/*.spec.*', 'buildconfig/**'] },
      ],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'no-restricted-exports': "off",
      'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
      'react/jsx-indent': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-multi-spaces': 0, // Disabled because of bug https://github.com/yannickcr/eslint-plugin-react/issues/2181
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      "react/jsx-uses-react": 0,
      "react/react-in-jsx-scope": 0,
      "react/require-default-props": "off",
      "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
      "react/function-component-definition": [
        2,
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      '@typescript-eslint/no-shadow': 2,
    },
  };
  