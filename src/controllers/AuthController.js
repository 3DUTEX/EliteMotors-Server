/* eslint-disable camelcase */
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const email = req.body.email ?? '';
    const password = req.body.password ?? '';

    const user = await User.findOne({ where: { email } });

    if (!user) return error400(res, 'Bad Request', 'User is not finded');

    const passwordIsValid = await compare(password, user.password_hash); // Comparando hash

    if (!passwordIsValid) {
      return res.status(401).json({
        error: {
          type: 'Unauthorized',
          message: 'Invalid password',
        },
      });
    }

    const { TOKEN_SECRET, TOKEN_EXPIRATION } = process.env;

    const token = await jwt.sign({ id: user.id, email: user.email }, TOKEN_SECRET, {
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
};

export const createGoogle = async (req, res) => {
  try {
    // verifica se foi recebido a crendecial
    if (!req.body.credential) {
      return error400(res, 'bad request', 'credential invalid or not received');
    }
    const { credential } = req.body;
    const userGoogleData = jwt.decode(credential);

    const { given_name, email, sub } = userGoogleData;

    // Verifica se já existe esse usuário
    let user = await User.findOne({ where: { googleID: userGoogleData.sub } });

    // Cria usuário se não existir
    if (!user) {
      user = await User.create({
        name: given_name,
        email,
        isGoogleAccount: true,
        googleID: sub,
      });
    }

    const { TOKEN_SECRET, TOKEN_EXPIRATION } = process.env;
    const token = await jwt.sign({ id: user.id, email: user.email }, TOKEN_SECRET, {
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
};
