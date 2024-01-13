"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _express = require('express');

var _AuthController = require('../controllers/AuthController'); var AuthController = _interopRequireWildcard(_AuthController);

const router = new (0, _express.Router)();

router.post('/auth', AuthController.create);

exports. default = router;
