const { contextBridge, ipcRenderer } = require('electron')
const Fs = require('fs')
const _ = require('lodash-tts')

contextBridge.exposeInMainWorld(
  'electronjs', {
		'out': function () {
			return ipcRenderer.invoke.apply(null, _.flatten(['process.out', _.toArray(arguments)]))
		},
		'event': function () {
			return ipcRenderer.invoke.apply(null, _.flatten(['event', _.toArray(arguments)]))
		},
		'exit': function () {
			ipcRenderer.invoke('exit')
		},
		'resize': function (w, h) {
			_.log(Math.ceil(w)+'x'+Math.ceil(h))
			ipcRenderer.invoke('resize', Math.ceil(w), Math.ceil(h))
		},
		'show': function () {
			ipcRenderer.invoke('show')
		},
		'log': function (s) {
			Fs.appendFile('./logger', s, 'utf8', (err) => {

			})
		}

  }
)

ipcRenderer.on('clear', () => {
	document.getElementsByClassName('card-body')[0].innerHTML = ''
	document.getElementsByClassName('card')[0].classList.add('Hidden')
})
ipcRenderer.on('html', (event, html) => {
	document.getElementsByClassName('card-body')[0].innerHTML += html
})

function InsertScript(file,cb=()=>{}){let script=document.createElement('script');script.type='text/javascript';script.src=file;script.addEventListener('load',function(e){cb(script)});document.getElementsByTagName('head')[0].appendChild(script)}
function InsertStyle(file,cb=()=>{}){let style=document.createElement('link');style.rel='stylesheet';style.href=file;style.addEventListener('load',function(e){cb(style)});document.getElementsByTagName('head')[0].appendChild(style)}

ipcRenderer.on('InsertScript', (event, js) => {
	_.log(Object.keys(event))
	_.logj(event)
	event.returnValue = 'yes'
	//InsertScript(js)
	return 'yes'
})
ipcRenderer.on('InsertStyle', (event, css) => {
	InsertStyle(css)
})

//window.addEventListener('load', ()  => {
	//window.ipcRenderer = ipcRenderer
	//ipcRenderer.invoke('server', ['get', 'port']).then(port => {window.port = port})

	//window.remote = remote
	//console.log('port:'+remote.getGlobal('app').get('port'))
//	window.$ = window.jQuery = require('jquery')
//	require('jquery-ui')
//	require('bootstrap')
//})


