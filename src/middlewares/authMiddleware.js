import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers; // Pegando o header 'authorization'

  // Caso não tenha esse header
  if (!authorization) {
    return res.status(401).json({
      error: {
        type: 'Unauthorized',
        message: 'Login required',
      },
    });
  }

  const [, token] = authorization.split(' ');

  // A verificação JWT retorna um erro caso dê errado, por isso deve ser colocado em um try cat
  try {
    const dados = await jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Checando se o payload do token existe no BD
    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        error: {
          type: 'Unauthorized',
          message: 'Token expired or invalid',
        },
      });
    }

    req.userId = id;
    req.userEmail = email;
  } catch (e) {
    return res.status(400).json({
      error: {
        type: 'Unexpected error',
        message: 'Please contact developer of system',
      },
    });
  }

  return next();
};
