import fs from 'fs';

export function error400(res, type, message) {
  return res.status(400).json({
    error: {
      type,
      message,
    },
  });
}

export function errorCatch(res, e) {
  if (e.errors) {
    const { errors } = e;
    // Se for um array pega apenas o indíce 0
    const error = Array.isArray(errors) ? errors[0] : errors;
    return error400(res, error.type, error.message);
  }

  return error400(res, 'Unexpected error', 'Please contact developer of system');
}
