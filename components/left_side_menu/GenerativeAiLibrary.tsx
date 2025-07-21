import React from "react"
import { useDispatch } from "react-redux";
import {
    settoolbarview
} from "../../app/store/editorSetting";
import ToolbarHeader from "../editor/helper/ToolbarHeader";

const GenerativeAiLibrary: React.FC = () => {

    const dispatch = useDispatch();


    const toolbarviewset = (view: string) => {
        dispatch(settoolbarview(view));
    }


    return (
        <div className="kd-editor-panel">
            <ToolbarHeader title="Generative AI" showSetToolbarViewClear={true} />
            <div className="flex flex-col gap-2">

                <div className="kd-Library-box" onClick={() => toolbarviewset("TextToSpeech")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/libraryimage/texttospeech.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">Text to Speech</span>
                </div>

                <div className="kd-Library-box" onClick={() => toolbarviewset("TextToImage")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/libraryimage/aiimage.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">AI Images</span>
                </div>

                <div className="kd-Library-box" onClick={() => toolbarviewset("AiRhymes")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/libraryimage/airhymes.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">AI Rhymes</span>
                </div>
            </div>
        </div>
    )
}
export default GenerativeAiLibrary;