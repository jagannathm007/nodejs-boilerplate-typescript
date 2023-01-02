import { Request } from 'express';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import MulterS3 from 'multer-s3';
import { v1 } from 'uuid';
import path from 'path';
import fs, { PathLike } from 'fs';

//S3 CONFIGURE
const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    secretAccessKey: process.env.AWS_SECRET || '',
    accessKeyId: process.env.AWS_ID || ''
  }
});

//UPLOAD TO AWS
export const uploadToAws = (folderPath: String) => {
  return multer({
    storage: MulterS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET || '',
      contentType: MulterS3.AUTO_CONTENT_TYPE,
      metadata: function (req: Request, file: any, cb: any) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: Request, file: any, cb: any) {
        let aws_path = `${folderPath}/${v1()}${path.extname(file.originalname)}`;
        cb(null, aws_path);
      }
    })
  });
}

//UPLOAD TO SERVER
export const uploadToServer = (folderPath: String) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req: Request, file: any, cb: any) {
        cb(null, folderPath);
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(null, v1() + path.extname(file.originalname));
      }
    })
  });
}

//DELETE FROM SERVER
exports.deleteFromServer = (filePath: PathLike) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
