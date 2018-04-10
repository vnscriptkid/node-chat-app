const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.on('createMessage', message => {
		console.log('CLIENT create a new message: ', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	// socket.emit('newMessage', {
	// 	from: 'handsome guy',
	// 	text: 'im beautiful'
	// });

	socket.on('disconnect', () => {
		console.log('a client disconnected');
	});
});

server.listen(PORT, () => {
	console.log('app is listening on port ' + PORT);
});
// socket.emit('newEmail', {
// 	from: 'your friend',
// 	text: 'you are awesome',
// 	createAt: 123
// });

// socket.on('createEmail', email => {
// 	console.log('client want to create a email: ', email);
// });
