import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaSyncAlt } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MiddleSectionVisibleaction, settoolbarview } from '../../../app/store/editorSetting';
import Image from "next/image";
import {
    FaPlay, FaPause,
    // FaPlus
} from 'react-icons/fa';
import { addClip, AudioClip, } from '../../../app/store/clipsSlice';
import { RootState } from '../../../app/store/store';


interface StockAudio {
    id: number;
    url: string;
    duration: number;
    title: string;
    // src: string;
}
const TextToSpeech: React.FC = () => {

    const [text, setText] = useState('');
    const [playing, setPlaying] = useState<string | null>(null);
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const playercurrentframe = useSelector(
        (state: RootState) => state.slices.present.playertotalframe
    );
    const dispatch = useDispatch();
    const toolbarviewset = (view: string) => {

        dispatch(settoolbarview(view));
    }
    const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(MiddleSectionVisibleaction(false));
    }

    const [stockaudio, setstockaudio] = useState<StockAudio[]>([]);
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

                setstockaudio(data);
                // console.log(data)
            } catch {
                console.error("erroe data not fetched")
            } finally {
                setLoading(false);
            }
        }
        fetchdata()
    }, [projectSettings.access_token, projectSettings.api_url])


    const togglePlayPause = (audioId: string) => {
        const currentAudio = audioRefs.current[audioId];
        if (currentAudio) {
            if (playing === audioId) {
                currentAudio.pause();
                setPlaying(null);
            } else {
                if (playing && audioRefs.current[playing]) {
                    audioRefs.current[playing]?.pause();
                }
                currentAudio.play();
                setPlaying(audioId);
            }
        }
    };

    const createAudioClip = (audio: StockAudio) => {
        const newClip: AudioClip = {
            id: `audio-${Date.now()}`,
            type: 'audio',
            properties: {
                src: audio.url,
                duration: Number(audio.duration) * 30,
                start: playercurrentframe,
                volume: 1,
                top: -100,
                width: 0,
                height: 0,
                rotation: 0,
                left: 0,
                zindex: 0,
                isDragging: false,
            },
        };
        dispatch(addClip(newClip));
    };

    const formatDuration = (durationInSeconds: number) => {
        console.log("durationInSeconds", durationInSeconds)
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    // model code 

    const [model, setModel] = useState(false);
    const [modeltap, setModeltap] = useState<"AiVoice" | "CloneVoice">("AiVoice");

    return (
        <div className="kd-editor-panel">
            <div className="kd-editor-head flex items-center justify-between text-white mb-2">

                <div className='flex items-center '>

                    <button
                        onClick={() => toolbarviewset("GenerativeAiLibrary")} className="toggle-icon"
                    >
                        <FaAngleLeft />
                    </button>

                    <p className="ms-1 left-text">Text To Speech</p>
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
                    }} rows={4}
                    className="kd-form-input"
                    placeholder="Type something..."
                />
            </div>

            {/* select voice */}
            <label className="theme-small-text mb-2">voice </label>
            <div className="bg-[#1E293B] text-white rounded-md shadow-lg border border-[#334155]">
                <div className="flex items-center justify-between border-b p-2 border-[#334155]">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://i.imgur.com/8Km9tLL.png"
                            alt="David"
                            className="img-box object-cover"
                        />
                        <div>
                            <h6 className='mb-1'>David</h6>
                            <div className="flex gap-1">
                                {["Gender", "Text", "Work", "Accent"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="badge-tags"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <span className="selected-tag">
                        Selected
                    </span>
                </div>



                {/* Change Voice Button */}
                <button onClick={() => { setModel(true) }} className="w-full flex items-center justify-center gap-2 text-gray-300 text-sm transition p-2">
                    <FaSyncAlt />
                    Change Voice
                </button>
            </div>

            {/* Generate Audio button */}
            <button className="my-2 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-gray-300 text-sm py-2 rounded-md transition border border-[#334155]">
                <FaSyncAlt />
                Generate Audio
            </button>
            {/* audio list */}
            <label className="theme-small-text mb-2">
                Recent Audio
            </label>
            <div className="p-2">

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader kd-white-color">Loading...</div>
                    </div>
                ) : stockaudio && stockaudio.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                        {stockaudio.map((audio, index) => (
                            <div key={audio.id} className="kd-audio-wrapper">
                                <div className="flex justify-between items-center gap-3">
                                    <button
                                        onClick={() => togglePlayPause(audio.id.toString())}
                                        className="audio-btn"
                                    >
                                        {playing === audio.id.toString() ? <FaPause /> : <FaPlay />}
                                    </button>

                                    <div className="flex-grow " onClick={() => createAudioClip(audio)}>
                                        <p className="text-sm font-semibold kd-white-color">{audio.title}</p>
                                        <p className="text-xs kd-white-color">{formatDuration(audio.duration)}</p>
                                    </div>


                                </div>

                                <audio
                                    ref={(el) => {
                                        audioRefs.current[audio.id] = el;
                                    }}
                                    src={audio.url}
                                    onEnded={() => {
                                        if (playing === audio.id.toString()) {
                                            setPlaying(null);
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="kd-white-color text-lg">No audio found</p>
                    </div>
                )}
            </div>

            {/* popup model start */}
            {model && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-40" 
                        style={{
                            backdropFilter: "blur(8px)",
                        }}
                    ></div>
                    {/* Popup Box */}
                    
                    <div className="fixed z-50" 
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div className='voice-wrapper'>
                            <div className="flex justify-between items-center mb-4">
                                <div className="nav-wrapper">
                                    <button onClick={() => setModeltap("AiVoice")} className="nav-button active">All Voice</button>
                                    <button onClick={() => setModeltap("CloneVoice")} className="nav-button">Clone Voice</button>
                                </div>

                                <button className="text-white closeBtn" onClick={() => setModel(false)}>
                                    <MdClose />
                                </button>
                            </div>
                            {modeltap === "AiVoice" && (
                                <div>
                                    {/* Filters */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <select className="bg-[#1f2937] text-white px-4 py-2 rounded-lg">
                                            <option>Language</option>
                                        </select>
                                        <select className="bg-[#1f2937] text-white px-4 py-2 rounded-lg">
                                            <option>Gender</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="bg-[#1f2937] text-white px-4 py-2 rounded-lg flex-1"
                                        />
                                    </div>

                                    {/* Voice Cards */}
                                    <div className="grid grid-cols-2 gap-3 scroll-bx-wrapper">
                                        <div className="voice-bx active">
                                            <div className="voice-img-wrapper">
                                                <img src="https://i.pravatar.cc/80?img=1" alt="Profile"/>
                                            </div>
                                            <div className="voice-info">
                                                <h2 className="name">Jaime</h2>
                                                <div className="voice-tags">
                                                    <span className="badge-tags">Gender</span>
                                                    <span className="badge-tags">Text</span>
                                                    <span className="badge-tags">Work</span>
                                                    <span className="badge-tags">Accent</span>
                                                </div>
                                            </div>
                                            <div className="selected-badge">Selected</div>
                                        </div>
                                        <div className="voice-bx">
                                            <div className="voice-img-wrapper">
                                                <img src="https://i.pravatar.cc/80?img=1" alt="Profile"/>
                                            </div>
                                            <div className="voice-info">
                                                <h2 className="name">Jaime</h2>
                                                <div className="voice-tags">
                                                    <span className="badge-tags">Gender</span>
                                                    <span className="badge-tags">Text</span>
                                                    <span className="badge-tags">Work</span>
                                                    <span className="badge-tags">Accent</span>
                                                </div>
                                            </div>
                                            <div className="selected-badge">Selected</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modeltap === "CloneVoice" && (
                                <div className="clone-voice-wrapper">
                                    <div className="inner-content">
                                        <div className="icon">
                                           <svg width="99" height="80" viewBox="0 0 99 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M94.7631 57.0376C92.8784 57.0376 91.3497 55.5089 91.3497 53.6243V26.3172C91.3497 24.4326 92.8784 22.9038 94.7631 22.9038C96.6477 22.9038 98.1764 24.4326 98.1764 26.3172V53.6243C98.1764 55.5089 96.6477 57.0376 94.7631 57.0376ZM83.0051 62.7266V17.2149C83.0051 15.3302 81.4764 13.8015 79.5917 13.8015C77.7071 13.8015 76.1783 15.3302 76.1783 17.2149V62.7266C76.1783 64.6113 77.7071 66.14 79.5917 66.14C81.4764 66.14 83.0051 64.6113 83.0051 62.7266ZM67.836 49.0731V30.8684C67.836 28.9837 66.3073 27.455 64.4226 27.455C62.538 27.455 61.0093 28.9837 61.0093 30.8684V49.0731C61.0093 50.9577 62.538 52.4865 64.4226 52.4865C66.3073 52.4865 67.836 50.9577 67.836 49.0731ZM52.6647 67.2778V12.6637C52.6647 10.779 51.1359 9.2503 49.2513 9.2503C47.3667 9.2503 45.8379 10.779 45.8379 12.6637V67.2778C45.8379 69.1624 47.3667 70.6912 49.2513 70.6912C51.1359 70.6912 52.6647 69.1624 52.6647 67.2778ZM37.4933 76.3801V3.56133C37.4933 1.67669 35.9646 0.147949 34.08 0.147949C32.1953 0.147949 30.6666 1.67669 30.6666 3.56133V76.3801C30.6666 78.2648 32.1953 79.7935 34.08 79.7935C35.9646 79.7935 37.4933 78.2648 37.4933 76.3801ZM22.3243 58.1754V21.766C22.3243 19.8814 20.7955 18.3527 18.9109 18.3527C17.0263 18.3527 15.4975 19.8814 15.4975 21.766V58.1754C15.4975 60.0601 17.0263 61.5888 18.9109 61.5888C20.7955 61.5888 22.3243 60.0601 22.3243 58.1754ZM7.15293 53.6243V26.3172C7.15293 24.4326 5.62419 22.9038 3.73955 22.9038C1.85491 22.9038 0.326172 24.4326 0.326172 26.3172V53.6243C0.326172 55.5089 1.85491 57.0376 3.73955 57.0376C5.62419 57.0376 7.15293 55.5089 7.15293 53.6243Z" fill="white" fill-opacity="0.15"/>
                                            </svg>
                                        </div>
                                        <div className="info">
                                            <h6>Drag & Drop or Upload Audio Here</h6>
                                            <p>Upload Voice File (MP3/WAV) - Minimum 5 Seconds, Maximum 30 seconds</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                </>
            )

            }

        </div>
    );
};

export default TextToSpeech;
