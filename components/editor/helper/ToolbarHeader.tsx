import React from 'react';
import { useDispatch } from 'react-redux';
import { MiddleSectionVisibleaction, settoolbarview } from '../../../app/store/editorSetting';
import Image from 'next/image';

type ToolbarHeaderProps = {
  title: string;
  showSetToolbarViewClear?: boolean; // true for Upload.tsx, false for others
};

const ToolbarHeader: React.FC<ToolbarHeaderProps> = ({ title, showSetToolbarViewClear = false }) => {
  const dispatch = useDispatch();

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(MiddleSectionVisibleaction(false));
    if (showSetToolbarViewClear) {
      dispatch(settoolbarview(""));
    }
  };

  return (
    <div className="kd-editor-head flex items-center justify-between text-white mb-4">
      <p className="left-text">{title}</p>
      <button onClick={handleClose} className="toggle-icon">
        <Image
         width={18}
         height={18}
        
          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/collapse.svg"
          alt="Collapse Icon"
        />
      </button>
    </div>
  );
};

export default ToolbarHeader;
