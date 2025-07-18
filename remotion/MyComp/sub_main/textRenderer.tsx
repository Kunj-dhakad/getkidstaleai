import React, {
  useEffect, useRef,
  useState,
} from "react";
import {
  TextClip,
  updateClip
} from "../../../app/store/clipsSlice";
import {
  Animated,
  Animation,
  Fade,
  Move,
  Scale,
  Rotate,
  CustomEasing,
} from "remotion-animated";

import { getAvailableFonts } from "@remotion/google-fonts";
import TypewriterSubtitle from "./textAnimation/typewriter-subtitle";
import { useDispatch } from "react-redux";
import {
  //  AbsoluteFill,
  Easing
} from "remotion";

type TextAlign = "left" | "right" | "center" | "justify";
type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width";

interface TextRendererprops {
  clip: TextClip;
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

const TextRenderer: React.FC<TextRendererprops> = ({ clip }) => {
  const { animation, duration } = clip.properties;

  const fontNameToSearch = clip.properties.fontFamily;
  const newFonts = getAvailableFonts();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFontDetails = async () => {
      const fonts = newFonts.find(
        (font) => font.fontFamily === fontNameToSearch
      );
      if (fonts) {
        const loaded = await fonts.load();
        // loaded.loadFont()
        await loaded.loadFont();
        setFontLoaded(true);
      };
    };
    loadFontDetails();
  }, [fontNameToSearch, newFonts]);


  const parentdiv: React.CSSProperties = {
    position: "absolute",
    top: `${clip.properties.top}px`,
    left: `${clip.properties.left}px`,
    zIndex: 100 - clip.properties.zindex,
    display: "flex",
    // overflow: "hidden",
    rotate: `${clip.properties.rotation}deg`,
    width: `${clip.properties.width}px`,
    height: clip.type === "text" ? "auto" : `${clip.properties.height}px`,
    boxSizing: "border-box",

  }


  const textStyle: React.CSSProperties = {
    // height: `${clip.properties.height}px`,
    width: `${clip.properties.width}px`,
    color: clip.properties.textColor,
    fontSize: `${clip.properties.fontSize}px`,
    fontFamily: clip.properties.fontFamily,
    fontWeight: clip.properties.fontWeight,
    opacity: clip.properties.opacity / 100,
    textAlign: clip.properties.textAlign as TextAlign,
    fontStyle: clip.properties.fontstyle,
    textDecorationLine: `${clip.properties.textDecorationLine}`,
    textTransform: clip.properties.textTransform as TextTransform,
    letterSpacing: `${clip.properties.letterSpacing}px`,
    lineHeight: `${clip.properties.lineHeight}`,
    // rotate: `${clip.properties.rotation}deg`,
    overflow: "hidden",
    margin: 0,
    padding: "10px",
    userSelect: "none",
  };

  const kdDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (kdDivRef.current) {
      const calculatedHeight = kdDivRef.current.offsetHeight;
      dispatch(
        updateClip({
          id: clip.id,
          properties: {
            height: calculatedHeight,
          },
        })
      );
    }

  }, [clip.properties.text, clip.properties.fontSize,
  clip.properties.fontFamily, clip.properties.fontWeight,
  clip.properties.textAlign, clip.properties.textDecorationLine,
  clip.properties.textTransform, clip.properties.letterSpacing, clip.properties.lineHeight,
  clip.properties.fontstyle, dispatch, clip.id]);

  if (!fontLoaded) {
    return null;
  }
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
      animation?.in?.degrees ?? 0
    ),
  ].filter((a): a is Animation => a !== null);
  return (
    <>

      {clip.properties.animation?.in.type === "Custom"
        ? (
          <div style={parentdiv}>
            <h1 style={textStyle}>
              <TypewriterSubtitle get_text={clip.properties.text} />
            </h1>
          </div>
        )
        : (

          <div style={parentdiv}>
            <div ref={kdDivRef}>
              <Animated animations={animations}
              >
                <h1 style={textStyle}>{clip.properties.text}</h1>
              </Animated>
            </div>
          </div>
        )}



      {/* {clip.properties.animationType === "text" && (
        <div style={parentdiv}>
          <div ref={kdDivRef}>
            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>
          </div>
        </div>
      )}

      {clip.properties.animationType === "heading" && (
        <div style={parentdiv}>
          <div ref={kdDivRef}>
            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>
          </div>
        </div>
      )}
      {clip.properties.animationType === "subheading" && (
        <div style={parentdiv}>
          <div ref={kdDivRef}>
            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>
          </div>
        </div>
      )}


      {clip.properties.animationType === "Typewriter" && (
        <div style={parentdiv}>
          <h1 style={textStyle} >
            <TypewriterSubtitle get_text={clip.properties.text} />
          </h1>
        </div>
      )} */}


      {/* {["text", "heading", "subheading"].includes(clip.properties.animationType)
        ? (
          <div style={parentdiv}>
            <div ref={kdDivRef}>
              <h1 style={textStyle}>{clip.properties.text}</h1>
            </div>
          </div>
        )
        : */}




      {/* {clip.properties.animationType === "Slide Top" && (
        <div style={parentdiv} ref={kdDivRef}>
          <Animated animations={[
            Move({
              y: -40, start: 1, // duration: 20
            }),
            Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
          ]}
          >
            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>
          </Animated>
        </div>

      )}

      {clip.properties.animationType === "Slide Bottom" && (
        <div style={parentdiv} ref={kdDivRef}>

          <Animated animations={[
            Move({ y: 40, start: 1, }),
            Fade({ to: 1, initial: 0, start: 1, duration: 30 }),
          ]}
          >


            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>

          </Animated>
        </div>
      )}


      {clip.properties.animationType === "Slide Left" && (
        <div style={parentdiv} ref={kdDivRef}>

          <Animated animations={[
            Move({ x: -40, start: 1, }),
            Fade({ to: 1, initial: 0, start: 1, duration: 30 }),]}
          >

            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>

          </Animated>
        </div>
      )}

      {clip.properties.animationType === "Slide Right" && (
        <div style={parentdiv} ref={kdDivRef}>

          <Animated animations={[
            Move({ x: 40, start: 1, }),
            Fade({ to: 1, initial: 0, start: 1, duration: 30 }),]}
          >

            <h1 style={textStyle}>
              {clip.properties.text}
            </h1>

          </Animated>
        </div>
      )} */}

      {/* {clip.properties.animationType === "Typewriter" && (
        <div style={parentdiv}>
          <h1 style={textStyle} >
            <TypewriterSubtitle get_text={clip.properties.text} />
          </h1>
        </div>
      )} */}


      {/* {clip.properties.animationType === "Fade in" && (
        <Animated animations={[
          Fade({ to: 1, initial: 0, start: 1, duration: 60 }),]}
        >
          <div style={parentdiv}>
            <div ref={kdDivRef}>
              <h1 style={textStyle}>
                {clip.properties.text}
              </h1>
            </div>
          </div>
        </Animated>
      )}

      {clip.properties.animationType === "Zoom in" && (

        <AbsoluteFill style={{ ...parentdiv }}>
          <Animated
            animations={[
              Scale({ by: 1, initial: 3, start: 1, }),
            ]}
          >
            <div ref={kdDivRef}>
              <h1 style={textStyle}>
                {clip.properties.text}
              </h1>
            </div>
          </Animated>
        </AbsoluteFill>

      )}



      {clip.properties.animationType === "Zoom out" && (
        <AbsoluteFill style={{ ...parentdiv }}>
          <Animated
            animations={[
              Scale({ by: 1, initial: 0.5 }),

            ]}
          >
            <div ref={kdDivRef}>
              <h1 style={textStyle}>
                {clip.properties.text}
              </h1>
            </div>
          </Animated>
        </AbsoluteFill>
      )} */}
    </>
  )

}

export default TextRenderer;

