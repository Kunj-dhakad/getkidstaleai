import React from 'react';
import { Composition,getInputProps } from "remotion";
import { Main } from "./MyComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  VIDEO_FPS,
 
} from "../types/constants";

const inputProps = getInputProps();
const duration = typeof inputProps.durationInFrames === 'number' ? inputProps.durationInFrames : 300; 
const height = typeof inputProps.videoHeight === 'number' ? inputProps.videoHeight :720; 
const Width = typeof inputProps.videoWidth === 'number' ? inputProps.videoWidth :720; 


export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={duration}
        fps={VIDEO_FPS}
        width={Width}
        height={height}
        defaultProps={defaultMyCompProps}
      />
      
    </>
  );
};
