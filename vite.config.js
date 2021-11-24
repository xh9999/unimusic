import {
	defineConfig
} from "vite"
import uni from '@dcloudio/vite-plugin-uni'
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		host: 'localhost',
		port: 4000,
		open: true,
		https: false,
		proxy: {
			"/recommend": {
				"target": "http://121.5.237.135:3000",
				"changeOrigin": true,
				"secure": false,
				// "withCredentials":true
			},
			"/login": {
				"target": "http://121.5.237.135:3000",
				"changeOrigin": true,
				"secure": false,
				"withCredentials":true
			},
		}
	},
})
