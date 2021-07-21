const Fs = require('fs')
const Path = require('path')
const _ = require('lodash-tts')

module.exports = (config) => {
	//module.paths.push(Path.resolve(config.paths.components, '../'))

	return new Promise((resolve, reject) => {
		config.component = require('../components/'+process.argv[2]+'/index.js')
		config.component.options = _.Options(component.options, JSON.parse(process.argv.length > 3 ? process.argv[3] : "{}"))
		resolve(config)
	})
}


