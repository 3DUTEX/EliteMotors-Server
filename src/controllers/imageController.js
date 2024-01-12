import randomNumber from '../helpers/randomNumber';
import supabase from '../config/supabase';
import { errorCatch } from './errors/error400';

const BUCKET = 'Elite Motors';

export const create = async (req, res) => {
  try {
    const { file } = req; // File from request (multer)
    const { mimetype } = file; // Image Type

    const expiresIn = 7776000;
    const numberID = randomNumber(); // Name of image

    // Upload Image
    await supabase.storage.from(BUCKET).upload(`cars/${numberID}`, file.buffer, { contentType: mimetype });

    // Generate URL
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(`cars/${numberID}`, expiresIn);

    return res.status(201).json(data);
  } catch (e) {
    return errorCatch(res, e);
  }
};
