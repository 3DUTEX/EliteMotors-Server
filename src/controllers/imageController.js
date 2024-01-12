import Image from '../models/Image';
import randomNumber from '../helpers/randomNumber';
import supabase from '../config/supabase';
import { errorCatch } from './errors/error400';

const BUCKET = 'Elite Motors';

export const create = async (req, res) => {
  try {
    const { vehicleID } = req.params;
    const { file } = req; // File from request (multer)
    const { mimetype } = file; // Image Type

    const expiresIn = 7776000;
    const numberID = randomNumber(); // Name of image

    // Upload Image
    await supabase.storage.from(BUCKET).upload(`cars/${numberID}`, file.buffer, { contentType: mimetype });

    // Generate URL
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(`cars/${numberID}`, expiresIn);

    const image = {
      storageID: numberID,
      url: data.signedUrl,
      vehicleID,
    };

    const response = await Image.create(image);

    return res.status(201).json(response);
  } catch (e) {
    console.log(e);
    return errorCatch(res, e);
  }
};
