import React, { useState, useEffect } from 'react';
import { updateVideoSettings } from '../../app/store/clipsSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { FaArrowLeft } from 'react-icons/fa';
import { MiddleSectionVisibleaction } from '../../app/store/editorSetting';

const MenuBarSetting: React.FC = () => {
  const VIDEO_HEIGHT = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const VIDEO_WIDTH = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );
  const VIDEO_BG = useSelector(
    (state: RootState) => state.slices.present.videobg
  );


  const dispatch = useDispatch();
  const [bgcolor, setTextColor] = useState("#000000");
  const [height, setHeight] = useState(1080);
  const [width, setWidth] = useState(1080);


  useEffect(() => {
    setTextColor(VIDEO_BG)
    setHeight(VIDEO_HEIGHT)
    setWidth(VIDEO_WIDTH)
    // console.log(VIDEO_HEIGHT,VIDEO_WIDTH)

  }, [VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_BG]);


  const update_values_bg = (bg: string) => {
    dispatch(updateVideoSettings({
      videowidth: width,
      videoheight: height,
      videobg: bg
    }));

  }

  const update_values_H_W = (h: number, w: number) => {
    console.log(h, w)
    dispatch(updateVideoSettings({
      videowidth: w,
      videoheight: h,
      videobg: bgcolor
    }));

  }

  const presets = [
    {
      width: 1080,
      height: 1920,
      label: "Tall Portrait",
      aspect: "9:16",
      image: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/tallPortrait.png"
    },
    {
      width: 1080,
      height: 1350,
      label: "Portrait",
      aspect: "4:5",
      image: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/landscape.png"
    },
    {
      width: 1080,
      height: 1080,
      label: "Square",
      aspect: "1:1",
      image: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/portrait.png"
    },
    {
      width: 1350,
      height: 1080,
      label: "Landscape",
      aspect: "5:4",
      image: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/wideLandscape.png"
    },
    {
      width: 1920,
      height: 1080,
      label: "Wide Landscape",
      aspect: "16:9",
      image: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/square.png"
    }]

    const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(MiddleSectionVisibleaction(false));
    }
  return (
    <div className="kd-editor-panel">
      <div className="kd-editor-head flex items-center justify-between text-white mb-4">
        <p className="left-text">Frame Setup</p>
        {/* <a href="javascript:void(0);" className="toggle-icon">
          <FaArrowLeft />
        </a> */}

        <button onClick={toolbarhide} className="toggle-icon">
          <FaArrowLeft />
        </button>
      </div>
      <div className="mb-4">
        <label className='theme-small-text mb-1'>Background Color</label>
        <div className="kd-color-picker">
          {/* Color Box */}
          <input
            type="color"
            value={bgcolor}
            onChange={(e) => {
              setTextColor(e.target.value);
              update_values_bg(e.target.value);
            }}
            className="kd-color-box"
          />

          {/* Color Code Input */}
          <input
            type="text"
            value={bgcolor}
            onChange={(e) => {
              setTextColor(e.target.value);
              update_values_bg(e.target.value);
            }}
            className="kd-color-text"
          />
        </div>
      </div>

      <h3 className='theme-small-text mb-2'>Preset</h3>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={(e) => {
              setWidth(preset.width)
              setHeight(preset.height)
              update_values_H_W(preset.height, preset.width);
            }}
            className="ratio-select-wrapper">
            <div className="ratio-select-inner">
              <img src={preset.image} alt={preset.label} />
              <div className="theme-small-text">{preset.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuBarSetting;
