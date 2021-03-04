import { UserConfig } from 'vite'
const path = require('path')

const config: UserConfig = {
	plugins: [],
	port: 8880,
	open: true,
	alias: {
		'/@/': path.resolve(__dirname, './src')
	}
	// proxy: {
	//   '/foo': ''
	// }
}

export default config
