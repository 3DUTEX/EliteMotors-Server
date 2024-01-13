"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

 function error400(res, type, message) {
  return res.status(400).json({
    error: {
      type,
      message,
    },
  });
} exports.error400 = error400;

 function errorCatch(res, e) {
  if (e.errors) {
    const { errors } = e;
    // Se for um array pega apenas o indíce 0
    const error = Array.isArray(errors) ? errors[0] : errors;
    return error400(res, error.type, error.message);
  }

  return error400(res, 'Unexpected error', 'Please contact developer of system');
} exports.errorCatch = errorCatch;
