/// <reference types="vitest" />
import { defineConfig, } from 'vite'
import {configDefaults } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  test: {
    globals: true,
    exclude: [ ...configDefaults.exclude, ],
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  }
})
