import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from '../config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import DatauriParser from 'datauri/parser';

/**
 * Uploading Images with Multer & Cloudinary.
 *
 * Multer provides the ability to save the uploaded image from the frontend,
 * save it in storage, in this case, in MEMORY to upload it into Cloudinary
 * instead of our own server.
 *
 * 1. Client uploads image to an api endpoint that accepts file upload.
 * 2. Multer parses the file contained in the Request with the help of
 *    the uploadImage Middleware.
 *    (a). This uses Datauri parser to convert the file in the proper format.
 *    (b). This base64 data is uploaded to Cloudinary via the uploadToCloud utils.
 *    (c). The parsed data is saved into res.locals and is used to save in the db.
 *
 */

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const memoryStorage = multer.memoryStorage();
const parser = new DatauriParser();

export const upload = multer({ storage: memoryStorage });

export const uploadToCloud = async (
  fileString: string | undefined,
  format: string,
) => {
  const { uploader } = cloudinary;
  const res = await uploader.upload(
    `data:image/${format};base64,${fileString}`,
  );
  return res;
};

export const bufferToDataURI = (fileFormat: string, buffer: Buffer) =>
  parser.format(fileFormat, buffer);
