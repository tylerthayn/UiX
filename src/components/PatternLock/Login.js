(function () {

//	window.Login = function () {
//		return new Promise((resolve, reject) => {
//			$('body').append($('<div class="Login"><div id="PatternLock" class="pattern-holder"></div></div>'))

			var lock = new PatternLock('#PatternLock',{
				matrix:[4,4],
				onDraw: function (pattern) {
					console.log(pattern)
					//$.post('https://x.ttscloud.site/Login', {pattern: pattern}, (data, status, jqXHR) => {
					//	$('.Login').remove()
					//	if (data == 'ok') {
							//resolve()
					//	} else {
							//reject()
					//	}
					//})
				}
			})
//		})
//	}

}())
