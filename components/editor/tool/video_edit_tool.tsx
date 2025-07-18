import React, { useState, useEffect } from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { RootState } from "../../../app/store/store";
import { updateClip } from "../../../app/store/clipsSlice";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";
import { TbBackground } from "react-icons/tb";
import { PiSelectionBackground } from "react-icons/pi";
import AnimationHelper from "../helper/animation_helper";
const VideoEditTool: React.FC = () => {
  const dispatch = useDispatch();
  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );
  const Activeid = useSelector(
    (state: RootState) => state.editorTool.Activeid
  );


  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(360);
  const [volume, setVolume] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, settop] = useState(0);
  const [transform, settransform] = useState("");
  const [borderRadius, setborderRadius] = useState("");


  useEffect(() => {
    const activeClip = Allclips.find(clip => clip.id === Activeid);
    if (activeClip?.type === "video") {
      setWidth(activeClip.properties.width)
      setHeight(activeClip.properties.height)
      setLeft(activeClip.properties.left);
      settop(activeClip.properties.top);
      settransform(activeClip.properties.transform);
      setborderRadius(activeClip.properties.borderRadius);
      setVolume(activeClip.properties.volume)
    }
  }, [Activeid, Allclips]);

  const update_value = (updateproperties: Partial<any>) => {
    dispatch(updateClip({
      id: Activeid, properties: {
        width,
        height,
        left,
        top,
        volume,
        borderRadius,
        transform,
        rotation,
        ...updateproperties
      }
    }))

  }

  const toggleFlip = (axis: string) => {
    settransform((prev) => {
      const newTransform = prev === `scale${axis}(-1)` ? "scale(1,1)" : `scale${axis}(-1)`;
      setTimeout(() => {
        update_value({ transform: newTransform });
      }, 0);

      return newTransform;
    });
  };



  // attach dattach 
  const bg_height = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const bg_width = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );

  const BgAttech = () => {
    setWidth(bg_width)
    setHeight(bg_height)
    setLeft(0)
    settop(0)

    update_value({
      width: bg_width,
      height: bg_height,
      zindex: 99,
      left: 0,
      top: 0,
    });
  }

  const BgDAttech = () => {
    setWidth(bg_width / 2)
    setHeight(bg_height / 2)
    setLeft(bg_width / 2 - bg_width / 4)
    settop(bg_height / 2 - bg_height / 4)

    update_value({
      width: bg_width / 2,
      height: bg_height / 2,
      left: bg_width / 2 - bg_width / 4,
      top: bg_height / 2 - bg_height / 4,
      zindex: 1,
    });
  }

  const [activeTab, setActiveTab] = useState<"video" | "animation">("video");


  return (
    <div className="kd-editor-panel">


      <div className="kd-tab-list style-2">
        <button
          onClick={() => setActiveTab("video")}
          className={`kd-tab-btn ${activeTab === "video" ? "active" : ""}`}
        >
          Image
        </button>
        <button
          onClick={() => setActiveTab("animation")}
          className={`kd-tab-btn ${activeTab === "animation" ? "active" : ""}`}
        >
          Animation
        </button>
      </div>

      {activeTab === "video" && (

        <div className="mt-1">
          <h2 className="text-xl font-semibold mb-4 text-white">Video Edit Properties</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Width & Height */}
            <div>
              <label className="theme-small-text mb-2">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => {
                  setWidth(Number(e.target.value))
                  update_value({ width: Number(e.target.value) })
                }}
                className="kd-form-input"
              />
            </div>
            <div>
              <label className="theme-small-text mb-2">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(Number(e.target.value))
                  update_value({ height: Number(e.target.value) })
                }}
                className="kd-form-input"
              />
            </div>

            {/* Volume */}
            <div>
              <label className="theme-small-text mb-2">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  update_value({ volume: Number(e.target.value) });
                }}
                className="w-full kd-range-input"
              />
            </div>

            {/* Rotation */}
            <div>
              <label className="theme-small-text mb-2">Rotation (°)</label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => {
                  setRotation(Number(e.target.value));
                  update_value({ rotation: Number(e.target.value) });
                }} className="w-full kd-range-input"
              />
            </div>

            {/* transform */}
            <div>
              <label className="theme-small-text mb-2">Flip</label>
              <div className="flex gap-2">
                <div className="btn-bx" onClick={() => toggleFlip("X")}>
                  <LuFlipHorizontal2 className="text-white" />
                </div>
                <div className="btn-bx" onClick={() => toggleFlip("Y")}>
                  <LuFlipVertical2 className="text-white" />
                </div>
              </div>
            </div>


            {/* bg attech disatech */}
            <div>
              <label className="theme-small-text mb-2">BG Attach/Detach</label>
              <div className="flex gap-2">
                <div className="btn-bx" onClick={() => BgAttech()}>
                  <TbBackground className="text-white" />
                </div>
                <div className="btn-bx" onClick={() => BgDAttech()}>
                  <PiSelectionBackground className="text-white" />
                </div>
              </div>
            </div>
            {/* borderRadius */}

            <div>
              <label className="theme-small-text mb-2">Border Radius</label>
              <div className="kd-custom-bx rounded">
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={borderRadius}
                  onChange={(e) => {
                    setborderRadius(e.target.value);
                    update_value({ borderRadius: e.target.value });
                  }}
                  className="w-full kd-range-input"
                />
                <span className="block mt-1 text-sm text-white">Radius: {borderRadius}px</span>
              </div>
            </div>


            {/* Position */}
            <div>
              <label className="theme-small-text mb-2">Position X (px)</label>
              <input
                type="number"
                value={left}
                onChange={(e) => {
                  setLeft(Number(e.target.value));
                  update_value({ left: Number(e.target.value) });
                }}
                className="kd-form-input"
              />
            </div>
            <div>
              <label className="theme-small-text mb-2">Position Y (px)</label>
              <input
                type="number"
                value={top}
                onChange={(e) => {
                  settop(Number(e.target.value));
                  update_value({ top: Number(e.target.value) });
                }}
                className="kd-form-input"
              />
            </div>


          </div>
        </div>
      )}
      {activeTab === "animation" && (
        <AnimationHelper active_type={"video"} />
      )}
    </div>
  );
};

export default VideoEditTool;
