const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dbnlrh9gs',
  api_key: '883294447992896',
  api_secret: '3OvBojO_WmeH2DtOEPP47Ac70Xk'
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve({
        url: result.secure_url,
      },
        {
          resource_type: "auto",
        })
    })
  })
}
module.exports = cloudinaryUploadImg
