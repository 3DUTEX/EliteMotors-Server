"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _randomNumber = require('../helpers/randomNumber'); var _randomNumber2 = _interopRequireDefault(_randomNumber);
var _supabase = require('../config/supabase'); var _supabase2 = _interopRequireDefault(_supabase);
var _error400 = require('./errors/error400');

const BUCKET = 'Elite Motors';

 const create = async (req, res) => {
  try {
    const { vehicleID } = req.params;
    const { file } = req; // File from request (multer)
    const { mimetype } = file; // Image Type

    const expiresIn = 7776000; // 3 mounth duration
    const numberID = _randomNumber2.default.call(void 0, ); // Name of image

    // Upload Image
    await _supabase2.default.storage.from(BUCKET).upload(`cars/${numberID}`, file.buffer, { contentType: mimetype });

    // Generate URL
    const { data } = await _supabase2.default.storage.from(BUCKET).createSignedUrl(`cars/${numberID}`, expiresIn);

    const image = {
      storageID: numberID,
      url: data.signedUrl,
      vehicleID,
    };

    const response = await _Image2.default.create(image);

    return res.status(201).json(response);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.create = create;

 const update = async (req, res) => {
  try {
    const { storageID } = req.params;
    const { file } = req; // File from request (multer)
    const { mimetype } = file; // Image Type

    const expiresIn = 7776000; // 3 mounth duration

    // Upload Image
    await _supabase2.default.storage.from(BUCKET).update(`cars/${storageID}`, file.buffer, { contentType: mimetype });

    // Generate URL
    const { data } = await _supabase2.default.storage.from(BUCKET).createSignedUrl(`cars/${storageID}`, expiresIn);

    const image = await _Image2.default.findOne({ where: { storageID } });

    const imageUpdated = await image.update({ url: data.signedUrl });

    return res.status(200).json(imageUpdated);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.update = update;

 const deleteImage = async (req, res) => {
  try {
    const { storageID } = req.params;

    // Upload Image
    await _supabase2.default.storage.from(BUCKET).remove(`cars/${storageID}`);

    const image = await _Image2.default.findOne({ where: { storageID } });

    image.destroy();

    return res.status(204).json();
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.deleteImage = deleteImage;
