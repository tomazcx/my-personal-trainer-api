import multer from 'multer'
import crypto from 'crypto'
import * as path from 'path'

const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
	directory: uploadFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(req, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex')

			const filename = `${fileHash}-${file.originalname}`

			callback(null, filename)
		}
	})
}

