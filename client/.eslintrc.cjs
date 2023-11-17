module.exports = {
    root: true,
    env: {browser: true, es2021: true},
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint',],
    rules: {
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-explicit-any": "off",
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
    },
}
