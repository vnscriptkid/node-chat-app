const socket = io();

socket.on('connect', function() {
	console.log('connected to the server');

	socket.emit('createMessage', {
		to: 'someone bad',
		text: 'i hate you'
	});
});

socket.on('newMessage', function(message) {
	console.log('SERVER someone send you a messeage: ', message);
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

// socket.emit('createEmail', {
// 	to: 'someone important',
// 	text: 'you are no longer important'
// });
// socket.on('newEmail', function(email) {
// 	console.log('newEmail', email);
// });
