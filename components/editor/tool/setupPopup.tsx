import React, { useEffect, useState, useRef } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { updateVideoSettings } from "../../../app/store/clipsSlice";

const SetupPopup: React.FC = () => {


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
  const [bgcolor, setBgColor] = useState("#000000");
  const [height, setHeight] = useState(1080);
  const [width, setWidth] = useState(1080);
  const [setupPopup, setSetupPopup] = useState(false);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBgColor(VIDEO_BG)
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
    // console.log(h, w)
    dispatch(updateVideoSettings({
      videowidth: w,
      videoheight: h,
      videobg: bgcolor
    }));

  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setSetupPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const getAspectRatioInfo = (w: number, h: number): { label: string; img: string } => {
    if (w === 1920 && h === 1080)
      return {
        label: "16:9",
        img: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/wideLandscape.png",
      };
    if (w === 1080 && h === 1920)
      return {
        label: "9:16",
        img: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/tallPortrait.png",
      };
    if (w === 1080 && h === 1350)
      return {
        label: "4:5",
        img: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/portrait.png",
      };
    if (w === 1080 && h === 1080)
      return {
        label: "1:1",
        img: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/square.png",
      };
    if (w === 1350 && h === 1080)
      return {
        label: "5:4",
        img: "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/landscape.png",
      };

    return { label: `${w}:${h}`, img: "" };
  };

  const { label: ratioLabel, img: ratioImg } = getAspectRatioInfo(width, height);
  const isActive = (h: number, w: number): boolean => height === h && width === w;

  return (
    <>
      <div className="left-content" ref={buttonRef} onClick={() => setSetupPopup(prev => !prev)}>
        <div className="kd-setup-popup-btn">
          <div className="flex items-center gap-2">
            <span className="ratio-img">
              <img className="max-w-full m-auto"
                src={ratioImg}
                alt="Ratio Image"
              />
            </span>
            <span className="aspect-ratio-title">{ratioLabel}</span>
          </div>
          <button className="kd-light-color" >
            {setupPopup ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>

      {
        setupPopup && (

          <div
            ref={popupRef}
            className="fixed shadow-lg w-[220] z-50 kd-setup-popup"
            style={{
              top: "56px",
              left: "10px",
            }}
          >
            <div className="bg-color-picker">
              <label className='theme-small-text mb-2'>Background Color</label>
              <div className="kd-color-picker">
                {/* Color Box */}
                <input
                  type="color"
                  value={bgcolor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    update_values_bg(e.target.value);
                  }}
                  className="kd-color-box"
                />

                {/* Color Code Input */}
                <input
                  type="text"
                  value={bgcolor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    update_values_bg(e.target.value);
                  }}
                  className="kd-color-text"
                />
              </div>
            </div>

            <div className="kd-ratio-option">
              <ul>
                <li>
                  <button
                    onClick={(e) => {
                      setWidth(1920)
                      setHeight(1080)
                      update_values_H_W(1080, 1920);
                    }}
                    className={`kd-ratio-option-btn ${isActive(1080, 1920) ? "active" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="ratio-img">
                        <img className="max-w-full m-auto"
                          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/wideLandscape.png"
                          alt="Ratio Image"
                        />
                      </span>
                      <span className="ratio-text">16:9</span>
                    </div>
                    <div className="kd-social-icon">
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/youtube.png"
                        alt="Social Image"
                      />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      setWidth(1080)
                      setHeight(1920)
                      update_values_H_W(1920, 1080);
                    }}
                    className={`kd-ratio-option-btn ${isActive(1920, 1080) ? "active" : ""}`}>

                    <div className="flex items-center gap-2">
                      <span className="ratio-img">
                        <img className="max-w-full m-auto"
                          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/tallPortrait.png"
                          alt="Ratio Image"
                        />
                      </span>
                      <span className="ratio-text">9:16</span>
                    </div>
                    <div className="kd-social-icon">
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/tiktok.png"
                        alt="Social Image"
                      />
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/youtubeShorts.png"
                        alt="Social Image"
                      />
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/facebook.png"
                        alt="Social Image"
                      />
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/instagram.png"
                        alt="Social Image"
                      />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      setWidth(1080)
                      setHeight(1350)
                      update_values_H_W(1350, 1080);
                    }}

                    className={`kd-ratio-option-btn ${isActive(1350, 1080) ? "active" : ""}`}>

                    <div className="flex items-center gap-2">
                      <span className="ratio-img">
                        <img className="max-w-full m-auto"
                          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/portrait.png"
                          alt="Ratio Image"
                        />
                      </span>
                      <span className="ratio-text">4:5</span>
                    </div>
                    <div className="kd-social-icon">
                      <img className="max-w-full m-auto"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/facebook.png"
                        alt="Social Image"
                      />
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/instagram.png"
                        alt="Social Image"
                      />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      setWidth(1080)
                      setHeight(1080)
                      update_values_H_W(1080, 1080);
                    }}

                    className={`kd-ratio-option-btn ${isActive(1080, 1080) ? "active" : ""}`}>

                    <div className="flex items-center gap-2">
                      <span className="ratio-img">
                        <img className="max-w-full m-auto"
                          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/square.png"
                          alt="Ratio Image"
                        />
                      </span>
                      <span className="ratio-text">1:1</span>
                    </div>
                    <div className="kd-social-icon">
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/facebook.png"
                        alt="Social Image"
                      />
                      <img className="w-full"
                        src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/instagram.png"
                        alt="Social Image"
                      />
                    </div>
                  </button>
                </li>
                <li>
                  <button

                    onClick={(e) => {
                      setWidth(1350)
                      setHeight(1080)
                      update_values_H_W(1080, 1350);
                    }}

                    className={`kd-ratio-option-btn ${isActive(1080, 1350) ? "active" : ""}`}>

                    <div className="flex items-center gap-2">
                      <span className="ratio-img">
                        <img className="max-w-full m-auto"
                          src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/spic/landscape.png"
                          alt="Ratio Image"
                        />
                      </span>
                      <span className="ratio-text">5:4</span>
                    </div>
                    <div className="kd-social-icon"></div>
                  </button>
                </li>
              </ul>
            </div>
          </div>

        )
      }


    </>

  )
}
export default SetupPopup;