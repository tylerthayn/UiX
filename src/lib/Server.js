require('@js/core')
const {ipcMain} = require('electron')
const Cors = require('cors')
const Express = require('express')
const Fs = require('fs')
const Logger = require('morgan')
const Path = require('path')

//const Db = require('./lib/db')
//const Routes = require('./lib/routes')
//const Wares = require('./lib/wares')

//let configs = require('./data/configs')
//let db = new Db.Media(configs.db)


let app = Express()
app.use(Cors())

//let router = Express.Router()
//app.use(Logger(configs.logger.format))
//app.use(Express.json())
//app.use(Express.urlencoded({ extended: true }))
//app.set('x-powered-by', false)


//Wares(app, configs)
//Routes(app, configs, db)
//app.use(Express.static('static'))
//app.get('/', (req, res, next) => res.sendFile(Path.resolve('static/Client.html')))
app.use((req, res, next) => {
	if (req.headers['user-agent'] != 'MediaPlayer-'+process.pid) {
		res.send('Invalid UserAgent')
	} else {
		console.log(req.headers)
		next()
	}
})

app.get('/', (req, res, next) => {
	res.send('hi')
})
//app.use('/x', Express.static('C:/Users/Tyler Thayn/.xDB/dls'))

app.set('port', GeneratePortNumber())
log(app.get('port'))
app.listen(app.get('port'))

module.exports = app

function GeneratePortNumber () {
	let min = 11550, max = 11599
	return Math.floor(Math.random() * (max - min + 1) + min)
}


ipcMain.handle('server', (event, args) => {
	console.log(args)
	return new Promise((resolve, reject) => {
		if (args[0] == 'get') {
			if (args[1] == 'port') {
				resolve(app.get('port'))
			}
		}
	})
})

