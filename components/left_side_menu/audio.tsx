import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay, FaPause, FaPlus } from 'react-icons/fa';
import { addClip, AudioClip, } from '../../app/store/clipsSlice';
import { RootState } from '../../app/store/store';


interface StockAudio {
  id: number;
  url: string;
  duration: number;
  title: string;
  // src: string;
}
const Audio: React.FC = () => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );
  const [stockaudio, setstockaudio] = useState<StockAudio[]>([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const res = await fetch("/api/getStockAudio");
        const data = await res.json();
        setstockaudio(data.data);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, []);


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
        duration: audio.duration,
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
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="mx-auto h-[80vh] overflow-y-scroll p-1">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-sky-600">Audio</p>
        </div>
        {stockaudio.map((audio, index) => (
          <div key={audio.id} className="p-2 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="flex justify-between items-center ">
              <button
                onClick={() => togglePlayPause(audio.id.toString())}
                className="p-2 mx-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                {playing === audio.id.toString() ? <FaPause /> : <FaPlay />}
              </button>

              <div className="flex-grow ">
                <p className="text-sm font-semibold text-gray-800">{audio.title}</p>
                <p className="text-sm text-gray-500">{formatDuration(audio.duration)}</p>
              </div>

              <button
                onClick={() => createAudioClip(audio)}
                className="p-2 mx-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
              >
                <FaPlus />
              </button>
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
    </div>
  );
};

export default Audio;
