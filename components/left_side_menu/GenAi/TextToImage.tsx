import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaSyncAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { MiddleSectionVisibleaction, settoolbarview } from '../../../app/store/editorSetting';
import Image from "next/image";
import { RootState } from '../../../app/store/store';



const TextToImage: React.FC = () => {

    const [text, setText] = useState('');
    const [images, setImages] = useState<any[]>([]);

    // const [reLoadinglist, setreLoadinglist] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();
    const toolbarviewset = (view: string) => {

        dispatch(settoolbarview(view));
    }
    const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(MiddleSectionVisibleaction(false));
    }

    const projectSettings = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        const fetchdata = async () => {
            try {

                const formdata = new FormData();
                formdata.append("access_token", projectSettings.access_token);
                const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-user-audios`, {
                    method: "POST",
                    body: formdata,
                });
                const data = await response.json();
                setImages(data);
            } catch {
                console.error("erroe data not fetched")
            } finally {
                setLoading(false);
            }
        }
        fetchdata()
    }, [projectSettings.access_token, projectSettings.api_url])

    return (
        <div className="kd-editor-panel">
            <div className="kd-editor-head flex items-center justify-between text-white mb-4">

                <div className='flex items-center '>

                    <button
                        onClick={() => toolbarviewset("GenerativeAiLibrary")} className="toggle-icon"
                    >
                        <FaAngleLeft />
                    </button>

                    <p className="ms-1 left-text">AI Images</p>
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

            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Write a Text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        // value_update({ text: e.target.value });
                    }} rows={4}
                    className="kd-form-input"
                    placeholder="Type something..."
                />
            </div>



            {/* image Ratio */}

            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Ratio
                </label>
                <div className="flex items-center gap-2">
                    <div>
                        <Image src={'https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/square.png'}
                            width={200} height={200}
                            alt={'1'}></Image>
                    </div>
                    <div>
                        <Image src={'https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/landscape.png'}
                            width={200} height={200}
                            alt={'1'}></Image>
                    </div>
                    <div>
                        <Image src={'https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/portrait.png'}
                            width={200} height={200}
                            alt={'1'}></Image>

                    </div>
                </div>
            </div>
            {/* Generate  button */}
            <button className="my-2 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-gray-300 text-sm py-2 rounded-md transition border border-[#334155]">
                <FaSyncAlt />
                Generate Image
            </button>


            {/* Voice Type Selector */}
            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Recent Image
                </label>
                {/* <div className="grid grid-cols-2 gap-2">
                    {loading ? (
                        <div className="col-span-2  text-center text-white">Loading images...</div>

                    ) : (
                        images.map((image, index) => (
                            <div key={index} className="relative image-box-wrapper">
                                <Image
                                    src={image.src.large}
                                    width={image.width}
                                    height={image.height}
                                    alt={`Image ${index}`}
                                    className="cursor-pointer"
                                // onClick={() => createclpis(image.src.original)}
                                // onLoadingComplete={handleImageLoad}
                                />
                            </div>
                        ))
                    )}
                </div> */}


                <div className="grid grid-cols-2 gap-2">
                 
                            <div  className="relative image-box-wrapper">
                                <Image
                                    src={""}
                                    width={200}
                                    height={200}
                                    alt={`Image ${1}`}
                                    className="cursor-pointer"
                                // onClick={() => createclpis(image.src.original)}
                                // onLoadingComplete={handleImageLoad}
                                />
                            </div>

                              <div  className="relative image-box-wrapper">
                                <Image
                                    src={""}
                                    width={200}
                                    height={200}
                                    alt={`Image ${1}`}
                                    className="cursor-pointer"
                                // onClick={() => createclpis(image.src.original)}
                                // onLoadingComplete={handleImageLoad}
                                />
                            </div>
                       

                         <div  className="relative image-box-wrapper">
                                <Image
                                    src={""}
                                    width={200}
                                    height={200}
                                    alt={`Image ${1}`}
                                    className="cursor-pointer"
                                // onClick={() => createclpis(image.src.original)}
                                // onLoadingComplete={handleImageLoad}
                                />
                            </div>
                       
                       
                </div>




            </div>
        </div>
    );
};

export default TextToImage;
