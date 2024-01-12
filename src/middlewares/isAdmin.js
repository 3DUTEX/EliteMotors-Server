import User from '../models/User';

const ADMIN = 'Admin';

function error401(res, type, message) {
  return res.status(401).json({
    error: {
      type,
      message,
    },
  });
}

export default async function (req, res, next) {
  try {
    if (!req.userId) {
      return error401(res, 'Unauthorized', 'Id invalid or not received');
    }
    const user = await User.findByPk(req.userId);

    if (user.level_access !== ADMIN) return error401(res, 'Unauthorized', 'level access admin is need for this route');

    return next(); // next middleware
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: {
        type: 'Unexpected error',
        message: 'Please contact developer of system',
      },
    });
  }
}
