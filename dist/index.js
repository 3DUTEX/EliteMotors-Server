"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Intialize server

// Import modules
var _server = require('./server'); var _server2 = _interopRequireDefault(_server);

const { PORT } = process.env;
_server2.default.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`),
);
