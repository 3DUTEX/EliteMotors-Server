"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);
var _isAdmin = require('../middlewares/isAdmin'); var _isAdmin2 = _interopRequireDefault(_isAdmin);
var _imageController = require('../controllers/imageController'); var imageController = _interopRequireWildcard(_imageController);

const storage = _multer2.default.memoryStorage();
const upload = _multer2.default.call(void 0, { storage });
const router = new (0, _express.Router)();

// POST : Create image/URL
router.post('/vehicles/images/:vehicleID', _authMiddleware2.default, _isAdmin2.default, upload.single('image'), imageController.create);

// PUT : Update image/URL
router.put('/vehicles/images/:storageID', _authMiddleware2.default, _isAdmin2.default, upload.single('image'), imageController.update);

// DELETE : Delete image/URL
router.delete('/vehicles/images/:storageID', _authMiddleware2.default, _isAdmin2.default, imageController.deleteImage);

exports. default = router;
