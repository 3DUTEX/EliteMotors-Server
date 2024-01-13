"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _isAdmin = require('../middlewares/isAdmin'); var _isAdmin2 = _interopRequireDefault(_isAdmin);
var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);
var _ReservationController = require('../controllers/ReservationController'); var ReservationController = _interopRequireWildcard(_ReservationController);

const router = new (0, _express.Router)();

// POST
router.post('/reservations', _authMiddleware2.default, ReservationController.create);

// GET
router.get('/reservations', _authMiddleware2.default, ReservationController.index);

// GET
router.get('/reservations/:id', _authMiddleware2.default, ReservationController.show);

// PUT
router.put('/reservations/:id', _authMiddleware2.default, ReservationController.update);

// DELETE
router.delete('/reservations/:id', _authMiddleware2.default, ReservationController.deleteReservation);

exports. default = router;
