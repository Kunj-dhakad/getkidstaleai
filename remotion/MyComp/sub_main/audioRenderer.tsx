import React from "react";
import { AudioClip } from "../../../app/store/clipsSlice";
import { AbsoluteFill, Audio } from "remotion";

interface videoRendererProps {
  clip: AudioClip;
}

const AudioRenderer: React.FC<videoRendererProps> = ({ clip }) => {
const volume=clip.properties.volume;
  return (
    <AbsoluteFill>
      <Audio
        // loop
        // playbackRate={1}
        // muted={false}
        // startFrom={60} 
        // endAt={120}
        // trimBefore={60} 
        // trimAfter={120}
        volume={volume}
        src={clip.properties.src} />
    </AbsoluteFill>
  )
}
export default AudioRenderer;