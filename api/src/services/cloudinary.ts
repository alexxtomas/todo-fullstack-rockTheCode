import { v2 as cloudinaryV2 } from 'cloudinary'

import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { CLOUDINARY_FOLDER } from '../utils/constants.js'
import { getCloudinrayKeys } from '../utils/logic.js'

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  getCloudinrayKeys()

const setUp = () => {
  cloudinaryV2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })
  console.log('Cloudinary set up 🚀')
}

const deleteFile = async (imgUrl: string) => {
  const imgSplited = imgUrl.split('/')
  const nameSplited = imgSplited[imgSplited.length - 1].split('.')
  const folderSplited = imgSplited[imgSplited.length - 2]
  const publicId = `${folderSplited}/${nameSplited[0]}`
  await cloudinaryV2.uploader.destroy(publicId, () => {
    console.log('Image deleted in cloudinary 🗑️')
  })
}

const params = {
  folder: CLOUDINARY_FOLDER,
  allowedFormats: ['jpg', 'png', 'jpeg', 'webp']
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params
})

export default { setUp, deleteFile, storage }
