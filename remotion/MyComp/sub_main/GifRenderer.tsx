import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { GifClip } from "../../../app/store/clipsSlice";
import {
    Animated,
    Animation,
    Fade,
    Move,
    Scale,
    Rotate,
    CustomEasing,
} from "remotion-animated";
import { Gif } from "@remotion/gif";

interface GifRendererProps {
    clip: GifClip;
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

export const GifRenderer: React.FC<GifRendererProps> = ({ clip }) => {
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

    const gifStyle: React.CSSProperties = {
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        // opacity: properties.opacity,
        userSelect: "none",
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
        <AbsoluteFill style={parentdiv}>
            <Animated animations={animations}>
                <Gif
                    style={gifStyle}
                    src={clip.properties.src}
                    playbackRate={1}
                />
            </Animated>
        </AbsoluteFill>
    );
};
