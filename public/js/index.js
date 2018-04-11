const socket = io();

socket.on('connect', function() {
	console.log('connected to the server');

	// socket.emit('createMessage', {
	// 	from: 'someone bad',
	// 	text: 'i hate you'
	// });
});

socket.on('newMessage', function(message) {
	console.log('new message: ', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

// socket.emit(
// 	'createMessage',
// 	{
// 		from: 'vnscriptkid',
// 		text: 'hello'
// 	},
// 	function(data) {
// 		console.log('Server received');
// 		console.log(data);
// 	}
// );

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: jQuery('[name=message]').val()
		},
		function() {}
	);
});

// socket.emit('createEmail', {
// 	to: 'someone important',
// 	text: 'you are no longer important'
// });
// socket.on('newEmail', function(email) {
// 	console.log('newEmail', email);
// });
