const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('ADMIN', 'welcome to chat app'));

	socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'Someone joined'));

	socket.on('createMessage', message => {
		console.log('CLIENT create a new message: ', message);
		// This emit to everyone including person who createMessage
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });

		// This emit to everyone except for person who createMessage
		socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
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
