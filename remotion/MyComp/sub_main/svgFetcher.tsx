// import React from "react";
// import { EmojiClip } from "../../../app/store/clipsSlice";
// import { AbsoluteFill, Img } from "remotion";
// import {
//   Animated, Fade, Move,
//   //  Rotate 
// } from "remotion-animated";
// interface SvgFetcherProps {
//   clip: EmojiClip;
// }

// export const SvgFetcher: React.FC<SvgFetcherProps> = ({ clip }) => {
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
//     // filter: `blur(${clip.properties.strokeWidth || 0}px)`,
//     // rotate: `${clip.properties.rotation}deg`,
//     transform: clip.properties.transform,
//     userSelect: "none",
//     backdropFilter: `blur(${clip.properties.strokeWidth || 0}px)`,

//   };

//   return (

//     <div>
//       <AbsoluteFill style={parentdiv}>

//         <Animated
//           animations={
//             clip.properties.animationType === "Slide Top"
//               ? [Move({ y: -40, start: 1, }),
//               Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
//                 // Rotate({ degreesX: 180 })

//               ]
//               : clip.properties.animationType === "Slide Bottom"
//                 ? [Move({ y: 40, start: 1, }),
//                 Fade({ to: 1, initial: 0, start: 1, duration: 30 }),

//                 ]
//                 : clip.properties.animationType === "Slide Left"
//                   ? [Move({ x: -40, start: 1, }),
//                   Fade({ to: 1, initial: 0, start: 1, duration: 30 }),

//                   ]
//                   : clip.properties.animationType === "Slide Right"
//                     ? [Move({ x: 40, start: 1, }),
//                     Fade({ to: 1, initial: 0, start: 1, duration: 30 }),

//                     ]
//                     : []
//           }
//         >
//           {clip.properties.svgtext === "" ? (
//             <Img src={clip.properties.src} style={imageStyle} />
//           ) : (
//             <AbsoluteFill
//               dangerouslySetInnerHTML={{ __html: clip.properties.svgtext }}
//               style={{
//                 width: clip.properties.width,
//                 height: clip.properties.height,
//                 opacity: clip.properties.opacity,
//                 // filter: `blur(${clip.properties.strokeWidth || 0}px)`,
//                 color: clip.properties.color,
//                 // -webkit-backdrop-filter: ,
//                 backdropFilter: `blur(${clip.properties.strokeWidth || 0}px)`,
//               }}
//             />
//           )}
//         </Animated>
//       </AbsoluteFill>

//     </div>


//   );
// };
import React from "react";
import { EmojiClip } from "../../../app/store/clipsSlice";
import { AbsoluteFill, Img,Easing } from "remotion";
import {
  Animated,
  Animation,
  Fade,
  Move,
  Scale,
  Rotate,
  CustomEasing,
} from "remotion-animated";
// import {
//   Animated, Fade, Move,
//   //  Rotate 
// } from "remotion-animated";
interface SvgFetcherProps {
  clip: EmojiClip;
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



export const SvgFetcher: React.FC<SvgFetcherProps> = ({ clip }) => {
    const { animation, duration } =clip.properties;

  const parentdiv: React.CSSProperties = {
    position: "absolute",
    top: `${clip.properties.top}px`,
    left: `${clip.properties.left}px`,
    zIndex: 100 - clip.properties.zindex,
    display: "flex",
    // overflow: "hidden",
    rotate: `${clip.properties.rotation}deg`,
    width: `${clip.properties.width}px`,
    height: `${clip.properties.height}px`,
    boxSizing: "border-box",

  }
  const imageStyle: React.CSSProperties = {
    width: `${clip.properties.width}px`,
    height: `${clip.properties.height}px`,
    opacity: clip.properties.opacity,
    // filter: `blur(${clip.properties.strokeWidth || 0}px)`,
    // rotate: `${clip.properties.rotation}deg`,
    transform: clip.properties.transform,
    userSelect: "none",
    backdropFilter: `blur(${clip.properties.strokeWidth || 0}px)`,

  };
 
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

    <div>
      <AbsoluteFill style={parentdiv}>

        <Animated
          animations={animations}
        >
          {clip.properties.svgtext === "" ? (
            <Img src={clip.properties.src} style={imageStyle} />
          ) : (
            <AbsoluteFill
              dangerouslySetInnerHTML={{ __html: clip.properties.svgtext }}
              style={{
                width: clip.properties.width,
                height: clip.properties.height,
                opacity: clip.properties.opacity,
                // filter: `blur(${clip.properties.strokeWidth || 0}px)`,
                color: clip.properties.color,
                // -webkit-backdrop-filter: ,
                backdropFilter: `blur(${clip.properties.strokeWidth || 0}px)`,
              }}
            />
          )}
        </Animated>
      </AbsoluteFill>

    </div>


  );
};
