
import { NextResponse } from "next/server";
import { dbConnection } from '../../../../lib/db';
// import fs from "node:fs/promises";
import { uploadToS3 } from "../../../../lib/s3";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const fileName = file?.name ?? "default_filename.mp4";
    const fileSize = file?.size ?? 0;
    const fileDuration = 0;
    const fileType="video";
    const fileThumbnail="";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    // const filePath = `./public/video/${Date.now()}_${fileName}`;
    // await fs.writeFile(filePath, buffer);


    const bucketName = process.env.KD_AWS_S3_BUCKET_NAME!;
    const key = `upload_videodata/${Date.now()}_${fileName}`;

    const s3Result = await uploadToS3(bucketName, key, buffer, file.type);


    const fileUrl = `https://remotionlambda-useast1-qe2jk3zrmz.s3.us-east-1.amazonaws.com/${key}`
    const connection = await dbConnection();
    const qry = "INSERT INTO `upload_files`(`file_name`, `file_type`, `file_url`, `file_duration`, `file_size`, `file_thumbnail`) VALUES (?,?,?,?,?,?)"
     const [result]=await connection.execute(qry,[
      fileName,
      fileType,
      fileUrl,
      fileDuration,
      fileSize,
      fileThumbnail,
    ]);

    // const [result] = await connection.execute(
    //   'INSERT INTO `videodata`(`file_name`, `file_size`, `file_duration`) VALUES (?, ?, ?)',
    //   [video_url, fileSize, fileDuration]
    // );

    return NextResponse.json({
      status: "success",
      fileName: key,
      fileSize: fileSize,
      fileDuration: fileDuration,
      s3Result: s3Result,
      result: result,
      message: "File successfully uploaded and database updated",
    });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({
      status: "fail",
      error: e,
    });
  }
}



