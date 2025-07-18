// import { useDispatch, useSelector } from "react-redux";
// import {
//     addClip,
// } from "../../../app/store/clipsSlice";
// import { Allclips } from "../../../app/store/clipsSlice";
// import { RootState } from "../../../app/store/store";

// export const useBgTemplateSet = () => {
//     const DURATION_IN_FRAMES = useSelector(
//         (state: RootState) => state.slices.present.totalduration
//     );
//     const dispatch = useDispatch();

//     const Set_bg_template = async (url: string) => {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch");
//             }
//             const jsonData = await response.json();
//             const payload = JSON.parse(jsonData.inputProps.payload);

//             payload.Allclips.forEach((clip: Allclips) => {
//                 const newStart = clip.properties.start + DURATION_IN_FRAMES;

//                 if (["text", "image", "audio", "video", "emoji", "gif", "caption", "captiontext", "audiowave"].includes(clip.type)) {
//                     const updatedClip = {
//                         ...clip,
//                         id: `clip-${Date.now()}-${Math.random()}`,
//                         properties: {
//                             ...clip.properties,
//                             start: newStart,
//                         },
//                         type: clip.type,
//                     } as Allclips;

//                     dispatch(addClip(updatedClip));
//                 } else {
//                     console.error("Invalid clip type:", clip.type);
//                 }
//             });

//         } catch (err) {
//             console.error("Error adding background template:", err);
//         }
//     };

//     return Set_bg_template;
// };



import { useDispatch } from "react-redux";
import {
    addClip,
    resetAllclips,
    settotalduration,
    updateVideoSettings,
} from "../../../app/store/clipsSlice";
import { Allclips } from "../../../app/store/clipsSlice";

export const useBgTemplateSet = () => {

    const dispatch = useDispatch();


    const Set_bg_template = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const jsonData = await response.json();
            // console.log("response", jsonData.inputProps);
            const payload = JSON.parse(jsonData.inputProps.payload);

            // console.log("videoWidth", payload.videoWidth);
            dispatch(resetAllclips());


            dispatch(
                updateVideoSettings({
                    videowidth: payload.videoWidth,
                    videoheight: payload.videoHeight,
                    videobg: payload.videobg,
                })
            );
            dispatch(settotalduration(payload.durationInFrames));

            payload.Allclips.forEach((clip: Allclips) => {
                dispatch(addClip(clip));
            });

        } catch (err) {

        }
    }

    return Set_bg_template;
};
