import React from "react";
import { CaptionClip } from "../../../app/store/clipsSlice";
import { OffthreadVideo } from "remotion";

interface videoRendererProps {
  clip: CaptionClip;
}

const CaptionVideoRenderer: React.FC<videoRendererProps> = ({ clip }) => {
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

  return (
    <div style={parentdiv} >
      <OffthreadVideo
        volume={clip.properties.volume}
        // playbackRate={clip.properties.volume}
        src={clip.properties.src}
        startFrom={clip.properties.TrimStart}
        endAt={clip.properties.TrimEnd}
        style={{
          width: `${clip.properties.width}px`,
          height: `${clip.properties.height}px`,
          userSelect: "none",
        }}
      />
    </div>
  )
}
export default CaptionVideoRenderer;
