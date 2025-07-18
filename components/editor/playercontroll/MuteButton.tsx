import type {PlayerRef} from '@remotion/player';
import React, {useEffect, useState} from 'react';
import { FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";

export const MuteButton: React.FC<{playerRef: React.RefObject<PlayerRef>;}> = ({playerRef}) => {

  
  const [muted, setMuted] = useState(playerRef.current?.isMuted() ?? false);
 
  const onClick = React.useCallback(() => {
    if (!playerRef.current) {
      return;
    }
 
    if (playerRef.current.isMuted()) {
      playerRef.current.unmute();
    } else {
      playerRef.current.mute();
    }
  }, [playerRef]);
 
  useEffect(() => {
    const {current} = playerRef;
    if (!current) {
      return;
    }
 
    const onMuteChange = () => {
      setMuted(current.isMuted());
    };
 
    current.addEventListener('mutechange', onMuteChange);
    return () => {
      current.removeEventListener('mutechange', onMuteChange);
    };
  }, [playerRef]);
 
  return (
    <button type="button" onClick={onClick}>
      {muted ? <GoUnmute /> : <FaVolumeMute />
      }
    </button>
  );
};