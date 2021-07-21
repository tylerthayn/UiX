
require(['lodash.tts', 'jquery', 'jquery-ui', 'bootstrap', 'notify', 'style!@css/UiX'], function(_, $) {
	$.notify.pluginOptions.globalPosition = 'top left'
	$.notify.pluginOptions.className = 'info'
	$.notify.pluginOptions.autoHideDelay = 2500

	$('body').removeAttr('style')
	window.UiX = {
		Clear: () => {
			$('.UiX .card-body').html('')
			$('.UiX .card').addClass('Hidden')
		},
		Done: (data) => {
			electronjs.out(data)
			electronjs.exit()
		},
		Ready: (options) => {
			$('.Title').text(options.title)
			$('.UiX .card').removeClass('Hidden')
			electronjs.show()
			UiX.Resize()
		},
		Resize: () => {
			electronjs.resize($('html').width(), $('html').height())
		}
	}

	$(() => {
		electronjs.event('ready')


	})


})


