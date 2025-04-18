import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            'max-len': ['error', { code: 90, tabWidth: 4 }],
            'no-console': ['error'],
            'no-multi-spaces': ['error'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
        },
    },
]

export default eslintConfig
