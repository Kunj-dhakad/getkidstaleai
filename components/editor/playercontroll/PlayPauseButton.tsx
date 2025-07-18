import type {PlayerRef} from '@remotion/player';
import {useCallback, useEffect, useState} from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

export const PlayPauseButton: React.FC<{
  playerRef: React.RefObject<PlayerRef>;
}> = ({playerRef}) => {
  const [playing, setPlaying] = useState(false);
 
  useEffect(() => {
    const {current} = playerRef;
    setPlaying(current?.isPlaying() ?? false);
    if (!current) return;
 
    const onPlay = () => {
      setPlaying(true);
    };
 
    const onPause = () => {
      setPlaying(false);
    };
 
    current.addEventListener('play', onPlay);
    current.addEventListener('pause', onPause);
 
    return () => {
      current.removeEventListener('play', onPlay);
      current.removeEventListener('pause', onPause);
    };
  }, [playerRef]);
 
  const onToggle = useCallback(() => {
    playerRef.current?.toggle();
  }, [playerRef]);
 




  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLButtonElement
      ) {
        return;
      }
      // console.log(`Key pressed: ${event.key}`);
   

      if (event.key === ' ') {
        event.preventDefault();
        onToggle();
      }
      // if (event.key === 'ArrowLeft') {
      //   // onSkipLeft();
      // } if (event.key === 'ArrowRight') {
      //   // onSkipRight();
      // }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onToggle]);







  return (
    <button onClick={onToggle} type="button">
      {playing ?  <FaPause /> :  <FaPlay />}
    </button>
  );
};