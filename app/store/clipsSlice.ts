import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { Caption } from "@remotion/captions";

export interface Item {
  id: number;
  durationInFrames: number;
  from: number;
  height: number;
  left: number;
  top: number;
  width: number;
  color: string;
  isDragging: boolean;
};

export interface TextClip {
  id: string;
  type: 'text';
  properties: {
    animationType: string;
    // subtype: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    text: string;
    width: number;
    height: number;
    textAlign: string;
    textColor: string;
    opacity: number;
    start: number;
    duration: number;
    top: number;
    left: number;
    zindex: number;
    rotation: number;
    textDecorationLine: string;
    textTransform: string;
    letterSpacing: number;
    lineHeight: number;
    fontstyle: string;
    isDragging: boolean;
    animation?: {
      in: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
      out: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
    };
  };
}


export interface ImageClip {
  id: string;
  type: 'image';
  properties: {
    src: string;
    width: number;
    height: number;
    opacity: number;
    start: number;
    duration: number;
    maxWidth: number;
    maxHeight: number;
    objectFit: string;
    top: number;
    left: number;
    zindex: number;
    contrast: number;
    hueRotate: number;
    saturate: number;
    blur: number;
    grayscale: number;
    sepia: number;
    brightness: number;
    rotation: number;
    borderRadius: string;
    transform: string;
    isDragging: boolean;
    animationType: string;

    /** ✅ Optional now */
    animation?: {
      in: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
      out: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
    };
  };
}

export interface VideoClip {
  id: string;
  type: 'video';
  properties: {
    src: string;
    videothumbnail: string;
    duration: number;
    start: number;
    width: number;
    height: number;
    top: number;
    left: number;
    zindex: number;
    TrimStart: number;
    TrimEnd: number;
    rotation: number;
    volume: number;
    borderRadius: string;
    transform: string;
    isDragging: boolean;
    animationType?: string;
    animation?: {
      in: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
      out: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
    };
  };
}

export interface CaptionClip {
  id: string;
  type: 'caption';
  properties: {
    src: string;
    videothumbnail: string;
    duration: number;
    start: number;
    width: number;
    height: number;
    top: number;
    left: number;
    zindex: number;
    TrimStart: number;
    TrimEnd: number;
    rotation: number;
    volume: number;
    isDragging: boolean;
  };
}


export interface CaptionTextClip {
  id: string;
  type: 'captiontext';
  properties: {
    src: string;
    caption_url: Caption[];
    videothumbnail: string;
    duration: number;
    start: number;
    width: number;
    height: number;
    top: number;
    left: number;
    zindex: number;
    TrimStart: number;
    TrimEnd: number;
    rotation: number;
    volume: number;
    isDragging: boolean;
  };
}


export interface AudioClip {
  id: string;
  type: 'audio';
  properties: {
    src: string;
    start: number;
    width: number;
    height: number;
    duration: number;
    rotation: number;
    volume: number;
    top: number;
    left: number;
    zindex: number;
    isDragging: boolean;
  };
}


export interface AudioWaveClip {
  id: string;
  type: 'audiowave';
  properties: {
    src: string;
    start: number;
    width: number;
    height: number;
    duration: number;
    volume: number;
    top: number;
    left: number;
    zindex: number;
    rotation: number;
    isDragging: boolean;
    audioOffsetInSeconds: number;
    audioFileName: string;
    onlyDisplayCurrentSentence: boolean;
    waveColor: string;
    waveFreqRangeStartIndex: number;
    waveLinesToDisplay: number;
    waveNumberOfSamples: string;
    mirrorWave: boolean;
  };
}

export interface EmojiClip {
  id: string;
  type: 'emoji';
  properties: {
    animationType: string;
    src: string;
    width: number;
    height: number;
    start: number;
    duration: number;
    top: number;
    left: number;
    zindex: number;
    fill: string;
    stroke: string;
    opacity: number;
    strokeWidth: number;
    filter: string;
    cursor: string;
    svgtext: string;
    rotation: number;
    transition: string;
    color: string;
    transform: string;
    isDragging: boolean;
    animation?: {
      in: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
      out: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
    };
  };
}



export interface GifClip {
  id: string;
  type: 'gif';
  properties: {
    src: string;
    width: number;
    height: number;
    start: number;
    duration: number;
    top: number;
    left: number;
    zindex: number;
    cursor: string;
    rotation: number;
    isDragging: boolean;
    animation?: {
      in: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
      out: {
        type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
        duration: number;
        slideDistanceX?: number;
        slideDistanceY?: number;
        degrees?: number;
      };
    };
  };
}


export type Allclips = TextClip | ImageClip | AudioClip | VideoClip | EmojiClip | GifClip | CaptionClip | CaptionTextClip | AudioWaveClip;

interface UpdateVideoSettingsPayload {
  videoheight: number;
  videowidth: number;
  videobg: string;
}

interface Watermark {
  watermark_url: string;
  watermark_permission: boolean;
}

interface ClipsState {
  Allclips: Allclips[];
  playertotalframe: number;
  totalduration: number;
  videoheight: number;
  videowidth: number;
  videobg: string;
  playerstatus: boolean;
  Timelienzoom: number;
  // Activeid: string;
  Watermark: Watermark[];
}

const initialState: ClipsState = {
  Allclips: [],
  playertotalframe: 1,
  totalduration: 1,
  videoheight: 1080,
  videowidth: 1080,
  videobg: "#FFFFFF0F",
  playerstatus: false,
  Timelienzoom: 100,
  // Activeid: "",
  Watermark: [],
};

const slices = createSlice({
  name: 'slices',
  initialState,
  reducers: {

    addClip: (state, action: PayloadAction<Allclips>) => {
      state.Allclips.push(action.payload);
    },



    // updateClip: (state, action: PayloadAction<{ id: string; properties: Partial<Allclips['properties']> }>) => {
    //   const clipIndex = state.Allclips.findIndex((clip) => clip.id === action.payload.id);
    //   if (clipIndex !== -1) {
    //     const updatedClip = state.Allclips[clipIndex];
    //     updatedClip.properties = { ...updatedClip.properties, ...action.payload.properties }; // Update properties
    //   }
    // },

    updateClip: (state, action: PayloadAction<{ id: string; properties: Partial<Allclips['properties']> }>) => {
      const clipIndex = state.Allclips.findIndex((clip) => clip.id === action.payload.id);

      if (clipIndex !== -1) {
        const existingClip = state.Allclips[clipIndex];
        const newProperties = action.payload.properties;

        // Shallow comparison to check if the new properties are different
        const isChanged = Object.keys(newProperties).some((key) => {
          return newProperties[key as keyof typeof newProperties] !==
            existingClip.properties[key as keyof typeof existingClip.properties];
        });

        // Only update if there is a change
        if (isChanged) {
          existingClip.properties = { ...existingClip.properties, ...newProperties };
          console.log("Updated Clip:", existingClip.properties);
        } else {
          console.log("No change detected, skipping update.");
        }
      }
    },



    deleteClip: (state, action: PayloadAction<string>) => {
      state.Allclips = state.Allclips.filter((clip) => clip.id !== action.payload);
    },

    resetAllclips: (state) => {
      state.Allclips = [];
    },



    setCurrentPlayerFrame: (state, action: PayloadAction<number>) => {
      state.playertotalframe = action.payload;
    },



    settotalduration: (state, action: PayloadAction<number>) => {
      state.totalduration = action.payload;
    },


    updateVideoSettings: (state, action: PayloadAction<UpdateVideoSettingsPayload>) => {
      const { videoheight, videowidth, videobg } = action.payload;
      state.videoheight = videoheight;
      state.videowidth = videowidth;
      state.videobg = videobg;
    },

    setplayerstatus: (state, action: PayloadAction<boolean>) => {
      state.playerstatus = action.payload;
    },

    setTimelinezoom: (state, action: PayloadAction<number>) => {
      state.Timelienzoom = action.payload;
    },

    // setActiveid: (state, action: PayloadAction<string>) => {
    //   state.Activeid = action.payload;
    // },

    updateWatermark: (state, action: PayloadAction<Watermark>) => {
      state.Watermark = [action.payload];
    },

  },
});
// const undoableReducer = undoable(slices.reducer);
const undoableReducer = undoable(slices.reducer, {
  filter: includeAction(['slices/addClip', 'slices/updateClip', 'slices/deleteClip', 'slices/resetAllclips']),
});

// Export actions
export const { addClip, updateClip, deleteClip, resetAllclips, setTimelinezoom, setplayerstatus, setCurrentPlayerFrame, settotalduration, updateVideoSettings, updateWatermark } = slices.actions;
// export default slices.reducer;
export default undoableReducer;


