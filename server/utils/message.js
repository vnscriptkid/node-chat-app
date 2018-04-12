const generateMessage = (from, text) => ({
	from,
	text,
	createdAt: new Date().getTime()
});

const generateLocation = (from, latitude, longitude) => ({
	from,
	latitude,
	longitude,
	createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateLocation };
