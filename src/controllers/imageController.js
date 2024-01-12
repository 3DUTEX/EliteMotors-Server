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

    const expiresIn = 7776000; // 3 mounth duration
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
    return errorCatch(res, e);
  }
};

export const update = async (req, res) => {
  try {
    const { storageID } = req.params;
    const { file } = req; // File from request (multer)
    const { mimetype } = file; // Image Type

    const expiresIn = 7776000; // 3 mounth duration

    // Upload Image
    await supabase.storage.from(BUCKET).update(`cars/${storageID}`, file.buffer, { contentType: mimetype });

    // Generate URL
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(`cars/${storageID}`, expiresIn);

    const image = await Image.findOne({ where: { storageID } });

    const imageUpdated = await image.update({ url: data.signedUrl });

    return res.status(200).json(imageUpdated);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { storageID } = req.params;

    // Upload Image
    await supabase.storage.from(BUCKET).remove(`cars/${storageID}`);

    const image = await Image.findOne({ where: { storageID } });

    image.destroy();

    return res.status(204).json();
  } catch (e) {
    return errorCatch(res, e);
  }
};
