import React, {  useState } from 'react';
import { FaAngleLeft, FaSyncAlt } from 'react-icons/fa';
import { useDispatch,  } from "react-redux";
import { MiddleSectionVisibleaction, settoolbarview } from '../../../app/store/editorSetting';
import Image from "next/image";



const AiRhymes: React.FC = () => {

    const [text, setText] = useState('');
 
    const dispatch = useDispatch();
    const toolbarviewset = (view: string) => {

        dispatch(settoolbarview(view));
    }
    const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(MiddleSectionVisibleaction(false));
    }


   
 


    // model code 



    return (
        <div className="kd-editor-panel">
            <div className="kd-editor-head flex items-center justify-between text-white mb-2">

                <div className='flex items-center '>

                    <button
                        onClick={() => toolbarviewset("GenerativeAiLibrary")} className="toggle-icon"
                    >
                        <FaAngleLeft />
                    </button>

                    <p className="ms-1 left-text">Ai Rhymes</p>
                </div>



                <button onClick={toolbarhide} className="toggle-icon">
                    <Image
                        width={18}
                        height={18}

                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/collapse.svg"
                        alt="Collapse Icon"
                    />
                </button>
            </div>

            {/* Text Input Field */}

            <div >
                <label className="theme-small-text mb-2">
                    Write a Text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        // value_update({ text: e.target.value });
                    }} rows={3}
                    className="kd-form-input"
                    placeholder="Type something..."
                />
            </div>



            {/* Generate Audio button */}
            <button className="my-2 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-gray-300 text-sm py-2 rounded-md transition border border-[#334155]">
                <FaSyncAlt />
                Generate Audio
            </button>

            <div className="p-2">
                <label className="theme-small-text mb-2">
                  Recent Audio 
                </label>
                <div>yha desugn karni he audio ki</div>
            </div>
        </div>
    );
};

export default AiRhymes;
