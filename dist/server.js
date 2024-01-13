"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Server config

// Import dependecies
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

// Import modules
var _UseRoutes = require('./helpers/UseRoutes'); var _UseRoutes2 = _interopRequireDefault(_UseRoutes);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

_dotenv2.default.config();
const app = _express2.default.call(void 0, );

app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.json()); // Configurando json no express

const useRoutes = new (0, _UseRoutes2.default)(app);
useRoutes.use(_routes2.default);

exports. default = app;
