// import React from "react";
// import { AbsoluteFill, Img } from "remotion";
// import { ImageClip } from "../../../app/store/clipsSlice";
// import {
//   Animated,
//   Fade,
//   Move,
//   Scale,

//   // Scale
// } from 'remotion-animated';

// interface ImageRendererProps {
//   clip: ImageClip;
// }

// export const ImageRenderer: React.FC<ImageRendererProps> = ({ clip }) => {

//   const parentdiv: React.CSSProperties = {
//     position: "absolute",
//     top: `${clip.properties.top}px`,
//     left: `${clip.properties.left}px`,
//     zIndex: 100 - clip.properties.zindex,
//     display: "flex",
//     // overflow: "hidden",
//     rotate: `${clip.properties.rotation}deg`,
//     width: `${clip.properties.width}px`,
//     height: `${clip.properties.height}px`,
//     boxSizing: "border-box",

//   }

//   const imageStyle: React.CSSProperties = {
//     width: `${clip.properties.width}px`,
//     height: `${clip.properties.height}px`,
//     opacity: clip.properties.opacity,
//     transform: clip.properties.transform,
//     borderRadius: `${clip.properties.borderRadius}px`,
//     // rotate: `${clip.properties.rotation}deg`,
//     userSelect: "none",
//     filter: `brightness(${clip.properties.brightness}%) 
//          grayscale(${clip.properties.grayscale}%) 
//        blur(${clip.properties.blur}px)
//         contrast(${clip.properties.contrast}%)
//         hue-rotate(${clip.properties.hueRotate}deg)
//         sepia(${clip.properties.sepia}%)
//          saturate(${clip.properties.saturate})
//         `,
//   };

//   return (
//     <>

//       {clip.properties.animationType === "normal" && (
//         <AbsoluteFill style={parentdiv}>
//           <Img src={clip.properties.src} style={imageStyle} />
//         </AbsoluteFill>
//       )}

//       {clip.properties.animationType === "Slide Top" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ y: -40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Slide Bottom" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ y: 40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}


//       {clip.properties.animationType === "Slide Left" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ x: -40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Slide Right" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ x: 40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Fade in" && (
//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated animations={[
//             Fade({ to: 1, initial: 0, start: 1, duration: 60 }),]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>
//       )}

//       {clip.properties.animationType === "Zoom in" && (

//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated
//             animations={[
//               Scale({ by: 1, initial: 3, start: 1, }),
//             ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Zoom out" && (
//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated
//             animations={[
//               Scale({ by: 1, initial: 0.5 }),

//             ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>
//       )}

//     </>
//   )
// };
// import React from "react";
// import { AbsoluteFill, Img } from "remotion";
// import { ImageClip } from "../../../app/store/clipsSlice";
// import {
//   Animated,
//   Fade,
//   Move,
//   Scale,

//   // Scale
// } from 'remotion-animated';

// interface ImageRendererProps {
//   clip: ImageClip;
// }

// export const ImageRenderer: React.FC<ImageRendererProps> = ({ clip }) => {

//   const parentdiv: React.CSSProperties = {
//     position: "absolute",
//     top: `${clip.properties.top}px`,
//     left: `${clip.properties.left}px`,
//     zIndex: 100 - clip.properties.zindex,
//     display: "flex",
//     // overflow: "hidden",
//     rotate: `${clip.properties.rotation}deg`,
//     width: `${clip.properties.width}px`,
//     height: `${clip.properties.height}px`,
//     boxSizing: "border-box",

//   }

//   const imageStyle: React.CSSProperties = {
//     width: `${clip.properties.width}px`,
//     height: `${clip.properties.height}px`,
//     opacity: clip.properties.opacity,
//     transform: clip.properties.transform,
//     borderRadius: `${clip.properties.borderRadius}px`,
//     // rotate: `${clip.properties.rotation}deg`,
//     userSelect: "none",
//     filter: `brightness(${clip.properties.brightness}%) 
//          grayscale(${clip.properties.grayscale}%) 
//        blur(${clip.properties.blur}px)
//         contrast(${clip.properties.contrast}%)
//         hue-rotate(${clip.properties.hueRotate}deg)
//         sepia(${clip.properties.sepia}%)
//          saturate(${clip.properties.saturate})
//         `,
//   };

//   return (
//     <>

//       {clip.properties.animationType === "normal" && (
//         <AbsoluteFill style={parentdiv}>
//           <Img src={clip.properties.src} style={imageStyle} />
//         </AbsoluteFill>
//       )}

//       {clip.properties.animationType === "Slide Top" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ y: -40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}

//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Slide Bottom" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ y: 40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}


//       {clip.properties.animationType === "Slide Left" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ x: -40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Slide Right" && (
//         <AbsoluteFill style={parentdiv}>
//           <Animated animations={[
//             Move({ x: 40, start: 1, }),
//             Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//           ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}




//       {/* {clip.properties.animationType === "Fade in" && (
//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated animations={[
//             Fade({ to: 1, initial: 0, start: 1, duration: 60 }),]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>
//       )} */}


//       {clip.properties.animationType === "Fade in" && (
//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated
//             animations={[
//               // Fade in at start
//               Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//               // Fade out at end
//               Fade({
//                 to: 0,
//                 start: clip.properties.duration - 30,
//                 duration: 30,
//               }),
//             ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>
//       )}



//       {clip.properties.animationType === "Zoom in" && (

//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated
//             animations={[
//               Scale({ by: 1, initial: 3, start: 1, }),
//             ]}
//           >
//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>

//       )}

//       {clip.properties.animationType === "Zoom out" && (
//         <AbsoluteFill style={{ ...parentdiv }}>
//           <Animated
//             animations={[
//               Scale({ by: 1, initial: 0.5 }),

//             ]}
//           >

//             <Img src={clip.properties.src} style={imageStyle} />
//           </Animated>
//         </AbsoluteFill>
//       )}

//     </>
//   )
// };
import React from "react";
import { AbsoluteFill, Easing, Img } from "remotion";
import { ImageClip } from "../../../app/store/clipsSlice";
import {
  Animated,
  Animation,
  Fade,
  Move,
  Scale,
  Rotate,
  CustomEasing,
} from "remotion-animated";

interface ImageRendererProps {
  clip: ImageClip;
}

const getAnimation = (
  type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate"|"Custom",
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

export const ImageRenderer: React.FC<ImageRendererProps> = ({ clip }) => {
  const { properties } = clip;
  const { animation, duration } = properties;

  const parentdiv: React.CSSProperties = {
    position: "absolute",
    top: `${properties.top}px`,
    left: `${properties.left}px`,
    zIndex: 100 - properties.zindex,
    display: "flex",
    rotate: `${properties.rotation}deg`,
    width: `${properties.width}px`,
    height: `${properties.height}px`,
    boxSizing: "border-box",
  };

  const imageStyle: React.CSSProperties = {
    width: `${properties.width}px`,
    height: `${properties.height}px`,
    opacity: properties.opacity,
    transform: properties.transform,
    borderRadius: `${properties.borderRadius}px`,
    userSelect: "none",
    filter: `brightness(${properties.brightness}%) 
      grayscale(${properties.grayscale}%) 
      blur(${properties.blur}px)
      contrast(${properties.contrast}%)
      hue-rotate(${properties.hueRotate}deg)
      sepia(${properties.sepia}%)
      saturate(${properties.saturate})`,
  };

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
    <AbsoluteFill style={parentdiv}>
      <Animated animations={animations}>
        <Img src={properties.src} style={imageStyle} />
      </Animated>
    </AbsoluteFill>
  );
};
