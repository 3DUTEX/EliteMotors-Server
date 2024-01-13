"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _userRoute = require('./userRoute'); var _userRoute2 = _interopRequireDefault(_userRoute);
var _authRoute = require('./authRoute'); var _authRoute2 = _interopRequireDefault(_authRoute);
var _vehicleRoute = require('./vehicleRoute'); var _vehicleRoute2 = _interopRequireDefault(_vehicleRoute);
var _imageRoute = require('./imageRoute'); var _imageRoute2 = _interopRequireDefault(_imageRoute);
var _reservationRoute = require('./reservationRoute'); var _reservationRoute2 = _interopRequireDefault(_reservationRoute);

const routes = [
  _userRoute2.default,
  _authRoute2.default,
  _vehicleRoute2.default,
  _imageRoute2.default,
  _reservationRoute2.default,
];

exports. default = routes;
