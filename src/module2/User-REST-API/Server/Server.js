require('better-logging')(console);
require('dotenv').config('.env'); // Note: env vars should not be used in production
const { Server } = require("./Helper");

const UserController = require("./Controllers/UserController");
const HomeController = require("./Controllers/HomeController");

server = new Server([
    new HomeController(),
    new UserController(),
])

module.exports = server.app;