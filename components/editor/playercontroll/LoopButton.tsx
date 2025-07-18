import React from 'react';
import { TfiLoop } from "react-icons/tfi";

export const LoopButton: React.FC<{
  loop: boolean;
  setLoop: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({loop, setLoop}) => {
  const onClick = React.useCallback(() => {
    setLoop((prev) => !prev);
  }, [setLoop]);
 
  return (
    <button type="button" onClick={onClick}>
      {loop ? <div className='text-teal-500 '><TfiLoop /></div>: <TfiLoop />}
    </button>
  );
};



