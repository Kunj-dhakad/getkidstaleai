import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
const AudioList: React.FC = () => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const [reLoadinglist, setreLoadinglist] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.data.action === 'FileUploadedSuccessfully') {
        // console.log("FileUploadedSuccessfully done");
        // setreLoadinglist(true);
        setreLoadinglist(prev => !prev);

      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };

  }, []);


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
  }, [projectSettings.access_token, projectSettings.api_url, reLoadinglist])


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

                {/* <button
                onClick={() => createAudioClip(audio)}
                className="p-2 mx-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
              >
                <FaPlus />
              </button> */}
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
  );
};

export default AudioList;
