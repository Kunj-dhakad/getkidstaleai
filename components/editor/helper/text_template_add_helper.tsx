// import { useDispatch, useSelector } from "react-redux";
// import {
//     addClip,
// } from "../../../app/store/clipsSlice";
// import { Allclips } from "../../../app/store/clipsSlice";
// import { RootState } from "../../../app/store/store";

// export const useTextTemplateSet = () => {
//     const dispatch = useDispatch();
//   const playercurrentframe = useSelector(
//     (state: RootState) => state.slices.present.playertotalframe
//   );
//     const Set_text_template = async (url: string) => {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch");
//             }
//             const jsonData = await response.json();
//             const payload = JSON.parse(jsonData.inputProps.payload);

//             payload.Allclips.forEach((clip: Allclips) => {
//                 // console.log(clip)
//                 dispatch(
//                     addClip({
//                         ...clip,
//                         id: `text-${Date.now()}-${Math.random()}`, 
//                     })
//                 );
//             });

//         } catch (err) {

//         }
//     }
//     return Set_text_template; 
// };
import { useDispatch, useSelector } from "react-redux";
import {
    addClip,
} from "../../../app/store/clipsSlice";
import { Allclips } from "../../../app/store/clipsSlice";
import { RootState } from "../../../app/store/store";

export const useTextTemplateSet = () => {
    const dispatch = useDispatch();
    const playercurrentframe = useSelector(
        (state: RootState) => state.slices.present.playertotalframe
    );

    const Set_text_template = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const jsonData = await response.json();
            const payload = JSON.parse(jsonData.inputProps.payload);

            payload.Allclips.forEach((clip: Allclips) => {
                if (clip.type === "text") {
                    return dispatch(
                        addClip({
                            ...clip,
                            id: `text-${Date.now()}-${Math.random()}`,
                            properties: {
                                ...clip.properties,
                                start: playercurrentframe,
                            },
                        })
                    );
                } else {
                    return dispatch(
                        addClip({
                            ...clip,
                            id: `text-${Date.now()}-${Math.random()}`,
                        })
                    );
                }
            });

        } catch (err) {
            console.error("Error loading template:", err);
        }
    };

    return Set_text_template;
};
