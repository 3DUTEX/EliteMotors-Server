"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);
var _isAdmin = require('../middlewares/isAdmin'); var _isAdmin2 = _interopRequireDefault(_isAdmin);

var _UserController = require('../controllers/UserController'); var UserController = _interopRequireWildcard(_UserController);

const router = new (0, _express.Router)();

router.get('/users/all', _authMiddleware2.default, _isAdmin2.default, UserController.index);

// POST : Create user
router.post('/users', UserController.create);

// GET : Get one user
router.get('/users', _authMiddleware2.default, UserController.show);

// PUT : Update one user
router.put('/users', _authMiddleware2.default, UserController.update);

// DELETE : Delete one user
router.delete('/users', _authMiddleware2.default, UserController.deleteUser);

exports. default = router;
