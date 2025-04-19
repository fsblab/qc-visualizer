import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
		svelte(),
		Icons({
			compiler: 'svelte',
		}),
		AutoImport({
			dts: true,
			resolvers: [
				IconsResolver({
					prefix: false,
					extension: 'svelte',
					enabledCollections: ['material-symbols'],
					alias: {
						ms: 'material-symbols',
					}
				}),
			],
		}),
	],
    build: {
		watch: {
			
		}
    },
})