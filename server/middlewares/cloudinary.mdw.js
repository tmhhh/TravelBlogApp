const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "coffeehouse",
  api_key: "383993481697725",
  api_secret: "OEUbE2t6HBpDgDXNBIcQVRqEscA",
});
const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = { uploadImage };
