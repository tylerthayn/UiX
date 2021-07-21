
$(() => {

	$('i.PasswordView').on('click', () => {
		if ($('input.Password').attr('type') === 'password') {
			$('input.Password').attr('type', 'text')
			$('i.PasswordView').text('visibility_off')
		} else {
			$('input.Password').attr('type', 'password')
			$('i.PasswordView').text('visibility')
		}
	})
	$('i.PasswordConfirmView').on('click', () => {
		if ($('input.PasswordConfirm').attr('type') === 'password') {
			$('input.PasswordConfirm').attr('type', 'text')
			$('i.PasswordConfirmView').text('visibility_off')
		} else {
			$('input.PasswordConfirm').attr('type', 'password')
			$('i.PasswordConfirmView').text('visibility')
		}
	})

	if (!options.includeUsername) {$('.form-group.Username').addClass('Hidden')}
	if (!options.confirm) {$('.form-group.PasswordConfirm').addClass('Hidden')}

	$('button.Submit').on('click', () => {
		let data = {}

		if (options.includeUsername) {
			if ($('input.Username').val() == '') {
				return $.notify('No username entered', 'error')
			}
			data.username = $('input.Username').val()
		}

		if ($('input.Password').val() == '') {
			return $.notify('No password entered', 'error')
		}

		if (options.confirm) {
			if ($('input.PasswordConfirm').val() == '') {
				return $.notify('Password must be confirmed', 'error')
			}
			if ($('input.Password').val() != $('input.PasswordConfirm').val()) {
				return $.notify('The passwords do not match', 'error')
			}
		}
		data.password = $('input.Password').val()

		UiX.Done(data)

	})

	UiX.Ready(options)

})
