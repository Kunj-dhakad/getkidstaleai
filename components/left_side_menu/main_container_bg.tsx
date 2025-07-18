import React, { useState } from 'react';
import ToolbarHeader from '../editor/helper/ToolbarHeader';
// import BgTemplate from '../editor/helper_side_menu/bg_template';
import BgVideo from '../editor/helper_side_menu/bg_video';
import BgColor from '../editor/helper_side_menu/bg_color';
import BgImageLibarary from '../editor/helper_side_menu/bg_iamge_libarary';

const MainContainerBg: React.FC = () => {

    const [activeTab, setActiveTab] = useState<"image" | "color" | "video">("color");
    return (

        <div className="kd-upload-panel">
            <ToolbarHeader title="Background" showSetToolbarViewClear={true} />
            <div className="kd-tab-list style-2">

                <button
                    onClick={() => setActiveTab("color")}
                    className={`kd-tab-btn ${activeTab === "color" ? "active" : ""}`}
                >
                    Color
                </button>


                <button
                    onClick={() => setActiveTab("image")}
                    className={`kd-tab-btn ${activeTab === "image" ? "active" : ""}`}
                >
                    Image
                </button>



                <button
                    onClick={() => setActiveTab("video")}
                    className={`kd-tab-btn ${activeTab === "video" ? "active" : ""}`}
                >
                    Video
                </button>
            </div>

            <div className='kd-upload-content'>
                {activeTab === "image" && (
                    <div>
                        {/* <BgImageGallery /> */}
                        <BgImageLibarary/>
                        {/* <BgTemplate /> */}
                    </div>
                )}


                {activeTab === "color" && (
                    <BgColor />
                )}


                {activeTab === "video" && (
                    <BgVideo />
                )}
            </div>



        </div>
    );
};

export default MainContainerBg;


