import React from "react"
import { useDispatch } from "react-redux";
import {
    // MiddleSectionVisibleaction,
    settoolbarview
} from "../../app/store/editorSetting";
// import { FaArrowLeft } from "react-icons/fa";
import ToolbarHeader from "../editor/helper/ToolbarHeader";

const Library: React.FC = () => {

    const dispatch = useDispatch();


    const toolbarviewset = (view: string) => {
        dispatch(settoolbarview(view));
    }

    //   const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
    //       e.stopPropagation();
    //       dispatch(MiddleSectionVisibleaction(false));
    //     }
    return (
        <div className="kd-editor-panel">
            <ToolbarHeader title="Library" showSetToolbarViewClear={true} />

            {/* <div className="kd-editor-head flex items-center justify-between text-white mb-4">
                <p className="left-text">Library</p>
                <button onClick={toolbarhide} className="toggle-icon">
                    <FaArrowLeft />
                </button>


            </div> */}

            <div className="flex flex-col gap-2">
                {/* <div className="kd-Library-box" onClick={() => toolbarviewset("emoji")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/elements.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">Elements</span>
                </div> */}
                <div className="kd-Library-box" onClick={() => toolbarviewset("video")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/videos.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">Video</span>
                </div>
                <div className="kd-Library-box" onClick={() => toolbarviewset("image")}>
                    <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/images.png"
                        alt="Library Box Image"
                    />
                    <span className="theme-small-text">Images</span>
                </div>
            </div>
        </div>
    )
}
export default Library;