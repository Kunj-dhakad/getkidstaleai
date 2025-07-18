import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    updateVideoSettings,
    settotalduration,
    addClip,
    resetAllclips,
} from "../../app/store/clipsSlice";
import { Allclips } from "../../app/store/clipsSlice";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { setsaveDraftId } from "../../app/store/editorSetting";
import { RootState } from "../../app/store/store";

const SaveDraft: React.FC = () => {
    const dispatch = useDispatch();


    const Set_template = async (url: string, id: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const jsonData = await response.json();
            // console.log("response", jsonData.inputProps);
            const payload = JSON.parse(jsonData.inputProps.payload);

            // console.log("videoWidth", payload.videoWidth);
            dispatch(setsaveDraftId(id));

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


    const [templateData, settemplateData] = useState<{ id: string; title: string, json_url: string }[] | undefined>(undefined);
    const [loading, setloading] = useState(false)



    const projectSettings = useSelector((state: RootState) => state.settings);

    const [resetSaveDraft, setresetSaveDraft] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {

                const formdata = new FormData();
                formdata.append("access_token", projectSettings.access_token);
                const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-save-draft-template`, {
                    method: "POST",
                    body: formdata,
                });
                const data = await response.json();

                settemplateData(data);
                console.log(data)
                setloading(false)

            } catch {
                console.error("erroe data not fetched")
            } finally {
                // settemplateData(data);
            }
        }
        fetchdata()
    }, [resetSaveDraft])


    const Remove_saveDraft = async (id: string) => {

        try {

            const formdata = new FormData();
            formdata.append("access_token", projectSettings.access_token);
            formdata.append("id", id);

            const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/delete-save-draft-template`, {
                method: "POST",
                body: formdata,
            });
            const data = await response.json();
            console.log(data);
            setresetSaveDraft(prev => !prev)

        } catch {
            console.error("erroe data not fetched")
        }



    }








    return (
        <div className="mx-auto h-[80vh] overflow-y-scroll p-2">
            <h2 className="text-lg font-bold text-sky-700">SaveDraft </h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader">Loading...</div>
                </div>
            ) : templateData && templateData.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {templateData.map((template, index) => (
                        <div key={index} className="mb-4">

                            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
                                <div
                                    className="cursor-pointer font-semibold text-gray-800"
                                // onClick={() => Set_template(template.json_url)}
                                >
                                    {template.title}
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => Set_template(template.json_url, template.id)}
                                        className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all w-5 h-5 flex items-center justify-center"
                                        title="Set Template"
                                    >
                                        <FaCheck size={30} />
                                    </button>

                                    <button
                                        onClick={() => Remove_saveDraft(template.id)}
                                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all w-5 h-5 flex items-center justify-center"
                                        title="Remove Template"
                                    >
                                        <ImCross size={30} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg">No template found</p>
                </div>
            )}

        </div>
    );
};

export default SaveDraft;
