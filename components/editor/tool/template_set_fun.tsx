import { useDispatch } from "react-redux";
import {
    updateVideoSettings,
    settotalduration,
    addClip,
    resetAllclips,
} from "../../../app/store/clipsSlice";
import { Allclips } from "../../../app/store/clipsSlice";

export const useTemplateSet = () => {
    const dispatch = useDispatch();

    const Set_template = async (url: string) => {
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
    return Set_template; 
};
