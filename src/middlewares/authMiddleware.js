import jwt from 'jsonwebtoken';
import User from '../models/User';

function error401(res, type, message) {
  return res.status(401).json({
    error: {
      type,
      message,
    },
  });
}

export default async (req, res, next) => {
  const { authorization } = req.headers; // Pegando o header 'authorization'

  // Caso não tenha esse header
  if (!authorization) {
    return error401(res, 'Unauthorized', 'Login Required');
  }

  if (!authorization.includes('Bearer')) {
    return error401(res, 'bad request', 'format token invalid');
  }

  const [, token] = authorization.split(' ');

  // A verificação JWT retorna um erro caso dê errado, por isso deve ser colocado em um try cat
  try {
    const dados = await jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Checando se o payload do token existe no BD
    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return error401(res, 'Unauthorized', 'Token expired or invalid');
    }

    req.userId = id;
    req.userEmail = email;
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: {
        type: 'Unexpected error',
        message: 'Please contact developer of system',
      },
    });
  }

  return next();
};
