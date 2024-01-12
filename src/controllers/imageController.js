import

export const create = async (req, res) => {
  try {
    const { file } = req;
    const { mimetype } = file; // Image Type

    const randomName = Number(new Date());

    // await supabase.storage.from('images users').upload(`/${randomName}`, file.buffer, { contentType: mimetype });
    // const { data } = await supabase.storage.from('images users').createSignedUrl(`/${randomName}`, 120);

    const { data } = await supabase.storage.from('images users').update('/1703269543029', file.buffer, { contentType: mimetype });

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};
