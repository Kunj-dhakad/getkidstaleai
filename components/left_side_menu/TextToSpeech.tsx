

import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { MiddleSectionVisibleaction, settoolbarview } from '../../app/store/editorSetting';
import Image from "next/image";
import {
    FaPlay, FaPause,
    // FaPlus
} from 'react-icons/fa';
import { addClip, AudioClip, } from '../../app/store/clipsSlice';
import { RootState } from '../../app/store/store';


interface StockAudio {
    id: number;
    url: string;
    duration: number;
    title: string;
    // src: string;
}
const TextToSpeech: React.FC = () => {

    const [text, setText] = useState('');
    const [language, setLanguage] = useState('en');
    const [voiceType, setVoiceType] = useState('female');
    const [playing, setPlaying] = useState<string | null>(null);
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
    // const [reLoadinglist, setreLoadinglist] = useState(false);
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

    return (
        <div className="kd-editor-panel">
            <div className="kd-editor-head flex items-center justify-between text-white mb-4">

                <div className='flex items-center '>

                    <button
                        onClick={() => toolbarviewset("Library")} className="toggle-icon"
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

            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Enter Text
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



            {/* Language Selector */}

            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Select Language
                </label>
                <select
                    className="kd-form-input"
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                        // value_update({ fontFamily: e.target.value });
                    }}
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
            </div>



            {/* Voice Type Selector */}
            <div className="mb-4">
                <label className="theme-small-text mb-2">
                    Select Voice Type
                </label>
                <select
                    className="kd-form-input"
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>

            {/* Play Button */}

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









        </div>
    );
};

export default TextToSpeech;
