import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaSyncAlt } from 'react-icons/fa';
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
                    }} rows={3}
                    className="kd-form-input"
                    placeholder="Type something..."
                />
            </div>

            {/* select voice */}
            <label className="theme-small-text mb-2">voice </label>
            <div className="bg-[#1E293B] text-white p-2 rounded-xl shadow-lg border border-[#334155]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <img
                            src="https://i.imgur.com/8Km9tLL.png"
                            alt="David"
                            className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="text-lg font-semibold">David</div>
                    </div>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                        Selected
                    </span>
                </div>


                <div className="mt-4 flex justify-between">
                    {["Gender", "Text", "Work", "Accent"].map((tag) => (
                        <span
                            key={tag}
                            className="bg-[#334155] text-sm px-2 py-1 rounded-md text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Change Voice Button */}
                <button onClick={() => { setModel(true) }} className="mt-4 w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1e293b] text-gray-300 text-sm py-2 rounded-md transition border border-[#334155]">
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
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-40"></div>
                    {/* Popup Box */}
                    <div
                        className="fixed shadow-lg z-50"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >

                        <div className="w-full p-2 max-w-5xl mx-auto bg-[#111827] rounded-xl shadow-xl text-white">


                            <div className="flex justify-between items-center mb-4">

                                <div className="flex space-x-2">
                                    <button onClick={() => setModeltap("AiVoice")} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">All Voice</button>
                                    <button onClick={() => setModeltap("CloneVoice")} className="px-4 py-2 rounded-lg bg-[#1f2937] text-gray-300">Clone Voice</button>
                                </div>

                                <button className="px-4 py-2 rounded-lg bg-[#0F172A] text-white" onClick={() => setModel(false)}>
                                    Close
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
                                    <div className="grid grid-cols-2  gap-4">
                                        <div className="bg-[#1e293b] text-white gap-2 rounded-xl p-2 flex items-center">
                                            <img
                                                src="https://i.pravatar.cc/80?img=1"
                                                alt="Profile"
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h2 className="text-sm font-semibold">Jaime</h2>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Gender</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Text</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Work</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Accent</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#1e293b] text-white gap-2 rounded-xl p-2 flex items-center">
                                            <img
                                                src="https://i.pravatar.cc/80?img=1"
                                                alt="Profile"
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h2 className="text-sm font-semibold">Jaime</h2>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Gender</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Text</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Work</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Accent</span>
                                                </div>
                                            </div>
                                        </div><div className="bg-[#1e293b] text-white gap-2 rounded-xl p-2 flex items-center">
                                            <img
                                                src="https://i.pravatar.cc/80?img=1"
                                                alt="Profile"
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h2 className="text-sm font-semibold">Jaime</h2>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Gender</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Text</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Work</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Accent</span>
                                                </div>
                                            </div>
                                        </div><div className="bg-[#1e293b] text-white gap-2 rounded-xl p-2 flex items-center">
                                            <img
                                                src="https://i.pravatar.cc/80?img=1"
                                                alt="Profile"
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h2 className="text-sm font-semibold">Jaime</h2>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Gender</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Text</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Work</span>
                                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">Accent</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modeltap === "CloneVoice" && (
                                <div>
                                    <div className="w-full max-w-xl mx-auto mt-10">
                                        <div
                                            className="relative flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-600 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white text-center px-6"
                                        >
                                           
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div className="absolute left-1/2 top-0 h-full w-px bg-blue-500 opacity-30"></div>
                                                <div className="absolute top-1/2 left-0 w-full h-px bg-blue-500 opacity-30"></div>
                                            </div>

                                           
                                            <div className="mb-4">
                                                
                                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M4 10h2v4H4v-4zm3-3h2v10H7V7zm3 4h2v2h-2v-2zm3-6h2v14h-2V5zm3 3h2v8h-2V8zm3 2h2v4h-2v-4z" />
                                                </svg>
                                            </div>
                                
                                            <p className="font-semibold">Drag & Drop or Upload Audio Here</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Upload Voice File (<span className="text-blue-400">MP3/WAV</span>) – Minimum 5 seconds, Maximum 30 seconds
                                            </p>
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
