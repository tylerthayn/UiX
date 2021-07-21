const Fs = require('fs')
const Path = require('path')
const _ = require('lodash-tts')
const { Command } = require('commander')

function ParseJson(value,dummy){return JSON.parse(value)}
function CollectOptions(value,previous){return previous.concat([value])}

module.exports = (config) => {
	module.paths.push(Path.resolve(config.paths.components, '../'))
	_.log('CLI:Start')
	return new Promise((resolve, reject) => {

		let program = new Command()
		program
			.version('1.0.0')
		program
			.argument('component')
			.option('-o, --options <json>', 'Component options (json)', ParseJson)
			.option('-c, --css <css>', 'CSS file paths', CollectOptions, [])
			.option('-h, --html <html>', 'HTML file paths', CollectOptions, [])
			.option('-j, --js <js>', 'JS file paths', CollectOptions, [])
			.action((component, options, command) => {
				if (component === 'custom') {
					config.component = options
				} else {
					config.component = _.Options(require('components/'+component), {options: options.options})
				}
				_.log('CLI:end'+JSON.stringify(config, null, 4))
				resolve(config)
			})
		program.parse(process.argv)


		function GetComponents () {
			let components = []
			Fs.readdirSync(Path.resolve(__dirname, 'components'), {withFileTypes: true}).forEach(entry => {
				entry.isDirectory() && components.push(entry.name)
			})
			return components
		}

	})

}


