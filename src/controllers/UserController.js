import User from '../models/User';

export const create = async (req, res) => {
  try {
    const {
      id, name, email, isGoogleAccount,
    } = await User.create(req.body);

    res.status(201).json({
      id,
      name,
      email,
      isGoogleAccount,

    });
  } catch (e) {
    const { errors } = e;
    const error = Array.isArray(errors) ? errors[0] : errors;
    res.status(400).json({
      error: {
        type: error.type,
        message: error.message,
      },
    });
  }
};
