"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);
var _isAdmin = require('../middlewares/isAdmin'); var _isAdmin2 = _interopRequireDefault(_isAdmin);
var _VehicleController = require('../controllers/VehicleController'); var VehicleController = _interopRequireWildcard(_VehicleController);

const router = new (0, _express.Router)();

router.get('/vehicles', VehicleController.index);

router.get('/vehicles/:id', VehicleController.show);

router.post('/vehicles', _authMiddleware2.default, _isAdmin2.default, VehicleController.create);

router.put('/vehicles/:id', _authMiddleware2.default, _isAdmin2.default, VehicleController.update);

router.delete('/vehicles/:id', _authMiddleware2.default, _isAdmin2.default, VehicleController.deleteVehicle);

exports. default = router;
