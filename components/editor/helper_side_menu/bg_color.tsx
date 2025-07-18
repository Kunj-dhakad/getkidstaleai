import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { updateVideoSettings } from "../../../app/store/clipsSlice";
import { FaPencil } from "react-icons/fa6";



interface BgColor {
    id: number;
    color_name: string;
    color_code: string;
    text_color: string;
}



const BgColor: React.FC = () => {


    const VIDEO_HEIGHT = useSelector(
        (state: RootState) => state.slices.present.videoheight
    );
    const VIDEO_WIDTH = useSelector(
        (state: RootState) => state.slices.present.videowidth
    );
    const VIDEO_BG = useSelector(
        (state: RootState) => state.slices.present.videobg
    );


    const dispatch = useDispatch();
    const [bgcolor, setBgColor] = useState("#000000");

    useEffect(() => {
        setBgColor(VIDEO_BG)
    }, [VIDEO_BG]);


    const update_values_bg = (bg: string) => {
        dispatch(updateVideoSettings({
            videobg: bg,
            videoheight: VIDEO_HEIGHT,
            videowidth: VIDEO_WIDTH,
        }));

    }
    const [bgcolordata, setBgColorData] = useState<BgColor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Ref for the hidden color input
    const colorInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const res = await fetch("/api/getBgColor");
                const data = await res.json();
                setBgColorData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching elements:", error);
            }
        };

        fetchElements();
    }, []);


    const handleBoxClick = (color: string) => {
        update_values_bg(color);
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    };

    function getContrastTextColor(hexColor: string): string {
        const color = hexColor.charAt(0) === "#" ? hexColor.substring(1, 7) : hexColor;
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 125 ? "#000000" : "#FFFFFF";
    }


    return (

        <div>

            {/* Hidden color input */}
            <input
                type="color"
                ref={colorInputRef}
                style={{ display: "none" }}
                value={bgcolor}
                onChange={(e) => update_values_bg(e.target.value)}
            />

            {/* 
            <div className="bg-color-picker">
                <div className="kd-color-picker">
                   
                    <input
                        type="color"
                        value={bgcolor}
                        onChange={(e) => {
                            setBgColor(e.target.value);
                            update_values_bg(e.target.value);
                        }}
                        className="kd-color-box"
                    />

                    
                    <input
                        type="text"
                        value={bgcolor}
                        onChange={(e) => {
                            setBgColor(e.target.value);
                            update_values_bg(e.target.value);
                        }}
                        className="kd-color-text"
                    />
                </div>
            </div> */}





            <div className="pt-2">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader kd-white-color">Loading...</div>
                    </div>
                ) : bgcolordata && bgcolordata.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {/* {bgcolordata.map((bgc, index) => (
                            


                            <div key={index} style={{ backgroundColor: `${bgc.color_code}`, color: `${bgc.text_color}` }} className="relative h-20  rounded p-4 w-full">

                                <div className="absolute top-2 left-2 text-sm font-mono">{bgc.color_code}</div>


                                <div className="absolute bottom-2 right-2 text-sm font-semibold">{bgc.color_name}</div>
                            </div>

                        ))} */}
                        {bgcolordata.map((bgc, index) => {
                            if (index === 0) {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleBoxClick(bgc.color_code)}
                                        style={{
                                            backgroundColor: bgcolor,
                                            //  color: bgc.text_color 
                                            color: getContrastTextColor(bgcolor)
                                        }}
                                        className="relative h-20  rounded p-4 w-full"
                                    >
                                        <div className="absolute top-2 left-2 text-sm font-mono">{bgcolor}</div>
                                        <div className="absolute bottom-2 right-2 text-sm font-semibold flex items-center gap-1">
                                            <FaPencil />
                                            <span>{bgc.color_name}</span>
                                        </div>

                                    </div>
                                );
                            }

                            return (
                                <div key={index} onClick={() => update_values_bg(bgc.color_code)} style={{ backgroundColor: `${bgc.color_code}`, color: `${bgc.text_color}` }}
                                    className="relative h-20  rounded p-4 w-full">
                                    <div className="absolute top-2 left-2 text-sm font-mono">{bgc.color_code}</div>
                                    <div className="absolute bottom-2 right-2 text-sm ">{bgc.color_name}</div>
                                </div>
                            );
                        })}

                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="kd-white-color text-lg">No Bg color found</p>
                    </div>
                )}
            </div>



        </div>
    )
}
export default BgColor;