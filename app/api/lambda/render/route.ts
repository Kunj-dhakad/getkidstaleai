require('dotenv').config();

import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from "../../../../config.mjs";
import { executeApi } from "../../../../helpers/api-response";
import { RenderRequest } from "../../../../types/schema";
export const POST = executeApi<RenderMediaOnLambdaOutput, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {

    // console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
    console.log("REMOTION_AWS_ACCESS_KEY_ID:", process.env.REMOTION_AWS_ACCESS_KEY_ID);

    if (
      // !process.env.AWS_ACCESS_KEY_ID &&
      !process.env.REMOTION_AWS_ACCESS_KEY_ID
    ) {
      throw new TypeError(
        "AWS_ACCESS_KEY_ID is missing!.",
      );
    }
    if (
      // !process.env.AWS_SECRET_ACCESS_KEY &&
      !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
    ) {
      throw new TypeError(
        "The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.",
      );
    }

    const result = await renderMediaOnLambda({
      
      codec: "h264",
      // framesPerLambda:10,
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: body.id,
      inputProps: body.inputProps,
      downloadBehavior: {
        type: "download",
        fileName: "video.mp4",
      },
    });

    return result;
  },
);
