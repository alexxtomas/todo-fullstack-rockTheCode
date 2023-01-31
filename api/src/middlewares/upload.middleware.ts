import cloudinary from '@services/cloudinary.js'
import multer from 'multer'

const { storage } = cloudinary

export const upload = multer({ storage })
