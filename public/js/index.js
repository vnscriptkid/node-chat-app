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

socket.on('newLocation', function(location) {
	var li = jQuery('<li></li>');
	li.text(location.from + ': ');
	var a = jQuery(
		`<a target="_blank" href="https://www.google.com/maps/search/${location.latitude}+${
			location.longitude
		}">See my location</a>`
	);
	li.append(a);
	jQuery('#messages').append(li);
});

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

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(
		function(position) {
			console.log(position);
			socket.emit('sendLocation', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function() {
			alert('Unable to fetch location');
		}
	);
});

// socket.emit('createEmail', {
// 	to: 'someone important',
// 	text: 'you are no longer important'
// });
// socket.on('newEmail', function(email) {
// 	console.log('newEmail', email);
// });
