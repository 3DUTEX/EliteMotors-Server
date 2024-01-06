import User from '../models/User';

function error400(res, type, message) {
  return res.status(400).json({
    error: {
      type,
      message,
    },
  });
}

export const create = async (req, res) => {
  try {
    if (req.body.email && !req.body.password) return error400(res, 'Bad request', 'Password is required');

    const {
      id, name, email, isGoogleAccount,
    } = await User.create(req.body);

    const user = {
      id,
      name,
      email,
      isGoogleAccount,
    };

    return res.status(201).json(user);
  } catch (e) {
    if (e.errors) {
      const { errors } = e;
      // Se for um array pega apenas o indíce 0
      const error = Array.isArray(errors) ? errors[0] : errors;
      return error400(res, error.type, error.message);
    }

    return error400(res, 'Unexpected error', 'Please contact developer of system');
  }
};
