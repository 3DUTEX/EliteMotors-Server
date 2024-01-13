/* eslint-disable camelcase */
import Reservation from '../models/Reservation';
import User from '../models/User';
import { error400, errorCatch } from './errors/error400';

const queryConfig = {
  attributes: ['id', 'name', 'email', 'isGoogleAccount', 'level_access'],
  include: {
    model: Reservation,
  },
};

// Somente admin
export const index = async (req, res) => {
  try {
    const users = await User.findAll(queryConfig);

    return res.status(200).json(users);
  } catch (e) {
    return errorCatch(res, e);
  }
};

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
    return errorCatch(res, e);
  }
};

export const show = async (req, res) => {
  try {
    if (!req.userId) return error400(res, 'Invalid ID', 'ID not receveid');

    const user = await User.findByPk(req.userId, queryConfig);

    return res.status(200).json(user);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const update = async (req, res) => {
  try {
    if (!req.userId) return error400(res, 'Invalid ID', 'ID not receveid');

    const user = await User.findByPk(req.userId);

    if (user.isGoogleAccount) {
      return res.status(403).json({
        error: {
          type: 'Forbidden',
          message: 'This user is a google account, not possible update data',
        },
      });
    }

    const {
      id, name, email, level_access,
    } = await user.update(req.body);

    return res.status(200).json({
      id, name, email, level_access,
    });
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.userId) return error400(res, 'Invalid ID', 'ID not receveid');

    const user = await User.findByPk(req.userId);

    await user.destroy();

    return res.status(204).json();
  } catch (e) {
    return errorCatch(res, e);
  }
};
