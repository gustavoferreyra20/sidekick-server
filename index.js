const app = require('./src/express/app');
const sequelize = require('./src/sequelize');
require('dotenv').config();
const PORT = process.env.PORT;
const { registerSocketHandlers } = require("./src/socket/chat.socket");
const http = require('http');
const { Server } = require("socket.io");
const os = require('os'); // Module to get local IP

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	const interfaces = os.networkInterfaces();
	const addresses = [];

	Object.values(interfaces).forEach(iface =>
		iface.forEach(addr => {
			if (addr.family === 'IPv4' && !addr.internal) {
				addresses.push(addr.address);
			}
		})
	);

	console.log(`Starting SideKick on port ${PORT}...`);
	console.log(`Internal IP addresses: ${addresses.join(', ')}`);

	const server = http.createServer(app);

	const io = new Server(server, {
		cors: { origin: "*" }
	});

	registerSocketHandlers({ io, sequelize });

	server.listen(PORT, () => {
		console.log(`Express server started at port: ${PORT}`);
	});
}

init();