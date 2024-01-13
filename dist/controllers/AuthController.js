"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _bcryptjs = require('bcryptjs');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

function error400(res, type, message) {
  return res.status(400).json({
    error: {
      type,
      message,
    },
  });
}

 const create = async (req, res) => {
  try {
    const email = _nullishCoalesce(req.body.email, () => ( ''));
    const password = _nullishCoalesce(req.body.password, () => ( ''));

    const user = await _User2.default.findOne({ where: { email } });

    if (!user) return error400(res, 'Bad Request', 'User is not finded');

    const passwordIsValid = await _bcryptjs.compare.call(void 0, password, user.password_hash); // Comparando hash

    if (!passwordIsValid) {
      return res.status(401).json({
        error: {
          type: 'Unauthorized',
          message: 'Invalid password',
        },
      });
    }

    const { TOKEN_SECRET, TOKEN_EXPIRATION } = process.env;

    const token = await _jsonwebtoken2.default.sign({ id: user.id, email: user.email }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isGoogleAccount: user.isGoogleAccount,
      },
    });
  } catch (e) {
    console.log(e);
    return error400(res, 'Unexpected error', 'Please contact developer of system');
  }
}; exports.create = create;
