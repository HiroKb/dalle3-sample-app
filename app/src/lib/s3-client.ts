import 'server-only'
import {S3Client} from "@aws-sdk/client-s3";

export const getS3Client = () => new S3Client({
  region: process.env.STORAGE_REGION,
  endpoint: process.env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: String(process.env.STORAGE_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.STORAGE_SECRET_ACCESS_KEY)
  },
  forcePathStyle: process.env.NODE_ENV === 'development'
})
