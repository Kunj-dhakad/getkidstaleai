import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.KD_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (
  bucketName: string,
  key: string,
  body: Uint8Array,
  contentType: string
) => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await s3.send(command);
    return { success: true, message: "File uploaded successfully", key };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
};
