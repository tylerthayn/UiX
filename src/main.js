#!/usr/bin/env node

const {BrowserWindow, session, ipcMain} = require('electron')
const Fs = require('fs')
const Path = require('path')
const _ = require('lodash-tts')
const config = require('./config')
const commander = require('commander')

process.stderr = Fs.createWriteStream(Path.resolve('./logger'))

config.component = require('./components/'+process.argv[2]+'/index.js')
config.component.options = _.Options(config.component.options, process.argv.length > 3 ? JSON.parse(process.argv[3]) : {})
app = require('./lib/App')(config)

/*
function ParseJson(value,dummy){return JSON.parse(value)}
function CollectOptions(value,previous){return previous.concat([value])}


function CLI (config) {


	//module.paths.push(Path.resolve(config.paths.components, '../'))
	return new Promise((resolve, reject) => {
		_.log('CLI.promise')
try {
	Fs.writeFileSync(Path.resolve('./log1'), Object.keys(program), 'utf8')
} catch (e) {Fs.writeFileSync(Path.resolve('./log2'), e, 'utf8')}
		_.log('CLI.promise')
_.log(program.version)
try {
		_.log(Object.keys(program))
} catch (e) {_.log(e)}
		//program
		//	.version('1.0.0')
		program
			.argument('component')
			.option('-o, --options <json>', 'Component options (json)', ParseJson)
			.option('-c, --css <css>', 'CSS file paths', CollectOptions, [])
			.option('-h, --html <html>', 'HTML file paths', CollectOptions, [])
			.option('-j, --js <js>', 'JS file paths', CollectOptions, [])
			.action((component, options, command) => {
				_.log(component)
				if (component === 'custom') {
					config.component = options
				} else {
					config.component = _.Options(require(Path.resolve(__dirname, 'components/'+component+'/index.js')), {options: options.options})
				}
				//_.log('CLI:end'+JSON.stringify(config, null, 4))
				resolve(config)
			})

		program.parse(process.argv)
		//_.log(program)

		function GetComponents () {
			let components = []
			Fs.readdirSync(Path.resolve(__dirname, 'components'), {withFileTypes: true}).forEach(entry => {
				entry.isDirectory() && components.push(entry.name)
			})
			return components
		}

	})

}




/*
const { Command } = require('commander')
const program = new Command()

program
	.version('1.0.0')
//program
//	.command('custom')
//	.description('Custom component')
//	.option('-o, --options <json>', 'Component options (json)', ParseConfig)
//	.option('-c, --css <css>', 'CSS file path', CollectOptions, [])
//	.option('-h, --html <html>', 'HTML file path', CollectOptions, [])
//	.option('-j, --js <js>', 'JS file path', CollectOptions, [])
//	.action((options, command) => {
//		app = require('./lib/App')(_.Options(config.app, {component: options}))
//	})


program
	.argument('component')
	.option('-o, --options <json>', 'Component options (json)', ParseConfig)
	.option('-c, --css <css>', 'CSS file path', CollectOptions, [])
	.option('-h, --html <html>', 'HTML file path', CollectOptions, [])
	.option('-j, --js <js>', 'JS file path', CollectOptions, [])
	.action((component, options, command) => {
		if (!GetComponents().includes(component) && component !== 'custom') {
			throw new Error('Component '+component+' not found')
		}
		if (component === 'custom') {
			app = require('./lib/App')(_.Options(config.app, {component: options}))
		} else {
			app = require('./lib/App')(_.Options(config.app, {component: require('./components/'+component)}, {component: {options: options.options}}))
		}
	})
program
	.command('components')
	.description('List available components')
	.action(() => {
		_.log(GetComponents())
		process.exit()
	})


program.parse()

function ParseConfig (value, dummy) {
	return JSON.parse(value)
}

function CollectOptions (value, previous) {
	return previous.concat([value]);
}

function GetComponents () {
	let components = []
	Fs.readdirSync(Path.resolve(__dirname, 'components'), {withFileTypes: true}).forEach(entry => {
		entry.isDirectory() && components.push(entry.name)
	})
	return components
}

*/
