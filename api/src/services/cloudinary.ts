import { v2 as cloudinaryV2 } from 'cloudinary'

import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { CLOUDINARY_PATH } from '../utils/constants.js'
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
  const imageName = imgUrl
    ?.split('/')
    ?.at(-1)
    ?.replace(/\.(.*)/, '')
  const fullPath = `${CLOUDINARY_PATH}/${imageName}`
  await cloudinaryV2.uploader.destroy(fullPath, () => {
    console.log('Image deleted in cloudinary 🗑️')
  })
}

const params = {
  folder: CLOUDINARY_PATH,
  allowedFormats: ['jpg', 'png', 'jpeg', 'webp']
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params
})

export default { setUp, deleteFile, storage }
