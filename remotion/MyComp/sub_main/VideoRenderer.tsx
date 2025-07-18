// import React from "react";
// import { VideoClip } from "../../../app/store/clipsSlice";
// import { AbsoluteFill, OffthreadVideo } from "remotion";

// interface videoRendererProps {
//   clip: VideoClip;
// }

// const VideoRenderer: React.FC<videoRendererProps> = ({ clip }) => {
//   // const isWebm = clip.properties.src.endsWith(".webm");
//   const parentdiv: React.CSSProperties = {
//     position: "absolute",
//     top: `${clip.properties.top}px`,
//     left: `${clip.properties.left}px`,
//     zIndex: 100 - clip.properties.zindex,
//     display: "flex",
//     overflow: "hidden",
//     rotate: `${clip.properties.rotation}deg`,
//     width: `${clip.properties.width}px`,
//     height: `${clip.properties.height}px`,
//     boxSizing: "border-box",

//   }
//   return (
//     <AbsoluteFill style={parentdiv}>
//       <OffthreadVideo
//         transparent
//         volume={clip.properties.volume}
//         // playbackRate={clip.properties.volume}
//         src={clip.properties.src}
//         startFrom={clip.properties.TrimStart}
//         endAt={clip.properties.TrimEnd}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           // width: `${clip.properties.width}px`,
//           transform:clip.properties.transform,
//           borderRadius:`${clip.properties.borderRadius}px`,
//           // height: `${clip.properties.height}px`,
//           userSelect: "none",
//         }}
//       />
//     </AbsoluteFill>
//   )
// }
// export default VideoRenderer;

import React from "react";
import { VideoClip } from "../../../app/store/clipsSlice";
import { AbsoluteFill, OffthreadVideo, Easing } from "remotion";

import {
  Animated,
  Animation,
  Fade,
  Move,
  Scale,
  Rotate,
  CustomEasing,
} from "remotion-animated";
interface videoRendererProps {
  clip: VideoClip;
}


const getAnimation = (
  type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom",
  direction: "in" | "out",
  duration: number,
  totalDuration: number,
  slideX = 0,
  slideY = 0,
  degrees = 0
): Animation | null => {
  const start = direction === "in" ? 0 : totalDuration - duration;

  switch (type) {
    case "Fade":
      return Fade({
        to: direction === "in" ? 1 : 0,
        initial: direction === "in" ? 0 : 1,
        start,
        duration,
        ease: CustomEasing(Easing.linear)
      });

    case "Zoom":
      return Scale({
        initial: direction === "in" ? 0.5 : 1,
        by: direction === "in" ? 1 : 0.5,
        start,
        duration,
        ease: CustomEasing(Easing.linear)
      });

    case "Slide":
      return Move({
        x: slideX,
        y: slideY,
        start,
        duration,
        ease: CustomEasing(Easing.linear)
      });

    case "Rotate":
      return Rotate({
        degrees: degrees,
        start,
        duration,
        ease: CustomEasing(Easing.linear)
      });

    default:
      return null;
  }
};



const VideoRenderer: React.FC<videoRendererProps> = ({ clip }) => {
  const viveoTrimEnd = Math.max(clip.properties.TrimEnd, clip.properties.duration);
  const { animation, duration } = clip.properties;
  const parentdiv: React.CSSProperties = {
    position: "absolute",
    top: `${clip.properties.top}px`,
    left: `${clip.properties.left}px`,
    zIndex: 100 - clip.properties.zindex,
    display: "flex",
    overflow: "hidden",
    rotate: `${clip.properties.rotation}deg`,
    width: `${clip.properties.width}px`,
    height: `${clip.properties.height}px`,
    boxSizing: "border-box",

  }



  // ✅ Prepare animations and remove nulls
  const animations: Animation[] = [
    getAnimation(
      animation?.in?.type ?? "None",
      "in",
      animation?.in?.duration ?? 0,
      duration,
      animation?.in?.slideDistanceX ?? 0,
      animation?.in?.slideDistanceY ?? 0,
      animation?.in?.degrees ?? 0
    ),
    getAnimation(
      animation?.out?.type ?? "None",
      "out",
      animation?.out?.duration ?? 0,
      duration,
      animation?.out?.slideDistanceX ?? 0,
      animation?.out?.slideDistanceY ?? 0,
      animation?.out?.degrees ?? 0
    ),
  ].filter((a): a is Animation => a !== null);
  return (
    <AbsoluteFill >
      <Animated className="absolute" style={parentdiv} animations={animations}>
        {viveoTrimEnd > clip.properties.TrimStart ? (
          <OffthreadVideo
            acceptableTimeShiftInSeconds={0.3}
            transparent
            volume={clip.properties.volume}
            src={clip.properties.src}
            startFrom={clip.properties.TrimStart}
            endAt={viveoTrimEnd}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: clip.properties.transform,
              borderRadius: `${clip.properties.borderRadius}px`,
              userSelect: "none",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            // backgroundColor: "black",
            textAlign: "center",
            color: "white",
            fontSize: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            ⚠️ Video not rendered  Invalid Split
          </div>
        )}

        {/* <OffthreadVideo
          acceptableTimeShiftInSeconds={0.3}
          transparent
          volume={clip.properties.volume}
          // playbackRate={clip.properties.volume}
          src={clip.properties.src}
          startFrom={clip.properties.TrimStart}
          endAt={viveoTrimEnd}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // width: `${clip.properties.width}px`,
            transform: clip.properties.transform,
            borderRadius: `${clip.properties.borderRadius}px`,
            // height: `${clip.properties.height}px`,
            userSelect: "none",
          }}
        /> */}
      </Animated>
    </AbsoluteFill>
  )
}
export default VideoRenderer;