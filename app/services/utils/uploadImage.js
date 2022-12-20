const cloudinary = require("../../../config/cloudinary");
const fileType = require("file-type");

async function uploadImg(imgBase64) {
  const base64String = imgBase64.split(",")[1];
  const mimetype = await fileType.fromBuffer(
    Buffer.from(base64String, "base64")
  );

  const file = `data:${mimetype.mime};base64,${base64String}`;

  try {
    const imgUrl = await cloudinary.uploader.upload(file);
    return imgUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  uploadImg,
};
