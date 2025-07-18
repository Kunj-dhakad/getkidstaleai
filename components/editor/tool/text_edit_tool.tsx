import React, {
  useState, useEffect,
  //  useRef
} from "react";
import "../../../styles/kdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { updateClip } from "../../../app/store/clipsSlice";
import { FaAlignLeft, FaAlignRight, FaStrikethrough, FaUnderline, FaAlignCenter, FaAlignJustify, FaBold, FaItalic,
  //  FaKeyboard 
  } from "react-icons/fa";
// import { TbOverline } from "react-icons/tb";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { RxLetterCaseCapitalize, RxLetterCaseLowercase, RxLetterCaseUppercase } from "react-icons/rx";
import { RiText } from "react-icons/ri";
// import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp } from "react-icons/lu";
// import { FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from "react-icons/fa6";
import AnimationHelper from "../helper/animation_helper";

const TextEditTool: React.FC = () => {

  type TextAlign = "left" | "center" | "right" | "justify";
  type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Roboto-Bold");
  const [fontSize, setFontSize] = useState(30);
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [textColor, setTextColor] = useState("");
  const [opacity, setOpacity] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, settop] = useState(0);
  const [width, setWidth] = useState(640);
  const [textDecorationLine, setTextDecorationLine] = useState("none");
  const [textTransform, setTextTransform] = useState<TextTransform>("none");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1);
  const [fontstyle, setFontstyle] = useState('normal');
  const [animationType, setanimationType] = useState('');

  const dispatch = useDispatch();
  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );
  const Activeid = useSelector(
    (state: RootState) => state.editorTool.Activeid
  );

  // const bg_height = useSelector(
  //   (state: RootState) => state.slices.present.videoheight
  // );
  // const bg_width = useSelector(
  //   (state: RootState) => state.slices.present.videowidth
  // );


  useEffect(() => {
    const activeText = Allclips.find((clip) => clip.id === Activeid);
    // console.log(activeClip?.properties);
    if (activeText?.type === "text") {
      setWidth(activeText.properties.width);
      setHeight(activeText.properties.height);
      setRotation(activeText.properties.rotation || 0);
      setLeft(activeText.properties.left);
      settop(activeText.properties.top);
      setText(activeText.properties.text);
      setFontFamily(activeText.properties.fontFamily);
      setFontSize(activeText.properties.fontSize);
      setFontWeight(activeText.properties.fontWeight);
      setTextColor(activeText.properties.textColor);
      setOpacity(activeText.properties.opacity);
      setTextDecorationLine(activeText.properties.textDecorationLine || "none");
      setLetterSpacing(activeText.properties.letterSpacing || 0);
      setLineHeight(activeText.properties.lineHeight || 1);
      setFontstyle(activeText.properties.fontstyle)
      setanimationType(activeText.properties.animationType)
    }
  }, [Activeid, Allclips]);


  const value_update = (updatedProperties: Partial<any>) => {
    dispatch(
      updateClip({
        id: Activeid,
        properties: {
          text,
          fontFamily,
          fontSize,
          fontWeight,
          textAlign,
          textColor,
          opacity,
          width,
          height,
          left,
          top,
          rotation,
          textDecorationLine,
          textTransform,
          letterSpacing,
          lineHeight,
          fontstyle,
          animationType,
          ...updatedProperties,
        },
      })
    );
  };




  interface Fontfamily {
    name: string;
    font_class: string;
  }
  const [fontfamilys, setfontfamilys] = useState<Fontfamily[]>([]);

  useEffect(() => {
    const fetch_ff = async () => {
      try {
        // setLoading(true);
        const response = await fetch("api/fontfamily", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const finalData = await response.json();
        setfontfamilys(finalData.data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetch_ff();
  }, []);





  const ItalicFontStyle = () => {
    const newFontStyle = fontstyle === "Italic" ? "Normal" : "Italic";
    setFontstyle(newFontStyle);
    value_update({ fontstyle: newFontStyle });
  };

  const toggleFontWeight = (newWeight: string) => {
    const updatedWeight = fontWeight === newWeight ? "normal" : newWeight;
    setFontWeight(updatedWeight);
    value_update({ fontWeight: updatedWeight });
  };

  const toggleTextDecorationLine = (newDecorationLine: string) => {
    const DecorationLine = textDecorationLine === newDecorationLine ? "none" : newDecorationLine;
    setTextDecorationLine(DecorationLine);
    value_update({ textDecorationLine: DecorationLine });
  };


  const [activeTab, setActiveTab] = useState<"text" | "animation">("text");


  return (
    <div className="kd-editor-panel" >

      <div className="kd-tab-wrapper">
        <div className="kd-tab-list style-2">
          <button
            onClick={() => setActiveTab("text")}
            className={`kd-tab-btn ${activeTab === "text" ? "active" : ""}`}
          >
            Text
          </button>
          <button
            onClick={() => setActiveTab("animation")}
            className={`kd-tab-btn ${activeTab === "animation" ? "active" : ""}`}
          >
            Animation
          </button>
        </div>
        {activeTab === "text" && (
          <div>
            {/* Text Input */}
            <div className="mb-4">
              <label className="theme-small-text mb-2">
                Text Input
              </label>

              <textarea

                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  value_update({ text: e.target.value });
                }} rows={3}
                className="kd-form-input"
                placeholder="Type something..."
              />

            </div>
            {/* Font Family */}
            <div className="mb-4">
              <label className="theme-small-text mb-2">
                Font Family
              </label>
              <select
                className="kd-form-input"
                value={fontFamily}
                onChange={(e) => {
                  setFontFamily(e.target.value);
                  value_update({ fontFamily: e.target.value });
                }}
              >
                {fontfamilys.map((font, index) => (
                  <option className={`${font.font_class}`} key={index} value={`${font.name}`}>{font.name.replace(/['"]/g, '')}</option>

                ))}
              </select>
            </div>





            <div className="grid grid-cols-2 gap-4 text-sm font-medium">


              {/* Font Size */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Font Size
                </label>
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={fontSize}
                  onChange={(e) => {
                    setFontSize(Number(e.target.value));
                    value_update({ fontSize: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>

              {/* Line Height */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Line Height
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => {
                    setLineHeight(Number(e.target.value));
                    value_update({ lineHeight: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>


              {/* Letter Spacing */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Letter Spacing
                </label>
                <input
                  type="number"
                  value={letterSpacing}
                  onChange={(e) => {
                    setLetterSpacing(Number(e.target.value));
                    value_update({ letterSpacing: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>


              {/* Text Alignment */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Text Align
                </label>

                <div className="kd-btn-group-input">
                  <button
                    className={` align-btn ${textAlign === "left" ? "active" : ""}`}
                    onClick={(e) => {
                      setTextAlign("left" as TextAlign);
                      value_update({ textAlign: "left" });
                    }}
                  >
                    <FaAlignLeft />
                  </button>

                  <button
                    className={` align-btn ${textAlign === "center" ? "active" : ""}`}
                    onClick={(e) => {
                      setTextAlign("center" as TextAlign);
                      value_update({ textAlign: "center" });
                    }}
                  >
                    <FaAlignCenter />
                  </button>



                  <button
                    className={` align-btn ${textAlign === "right" ? "active" : ""}`}
                    onClick={(e) => {
                      setTextAlign("right" as TextAlign);
                      value_update({ textAlign: "right" });
                    }}
                  >
                    <FaAlignRight />
                  </button>



                  <button
                    className={` align-btn ${textAlign === "justify" ? "active" : ""}`}
                    onClick={(e) => {
                      setTextAlign("justify" as TextAlign);
                      value_update({ textAlign: "justify" });
                    }}
                  >
                    <FaAlignJustify />
                  </button>
                </div>

              </div>


              {/* Text Color */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  className="kd-form-input style-2"
                  value={textColor}
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    value_update({ textColor: e.target.value });
                  }}
                />
              </div>



              {/* Opacity */}
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Opacity
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => {
                    setOpacity(Number(e.target.value));
                    value_update({ opacity: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>


            </div>


            {/*  Text Decoration */}

            <div>
              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Text Decoration
                </label>

                <div className="flex space-x-2">
                  <button
                    className={` kd-btn-check ${fontWeight === "bold" ? "active" : ""}`}

                    onClick={() => toggleFontWeight("bold")}
                  >
                    <FaBold />
                  </button>


                  <button
                    className={`kd-btn-check 
          ${fontWeight === "Lighter" ? " active" : ""}`}

                    onClick={() => toggleFontWeight("Lighter")}
                  >
                    <RiText />
                  </button>



                  <button
                    className={`kd-btn-check 
          ${fontstyle === "Italic" ? " active" : ""}`}

                    onClick={ItalicFontStyle}
                  >
                    <FaItalic />
                  </button>





                  <button
                    className={`kd-btn-check 
          ${textDecorationLine === "underline" ? "active" : ""}`}

                    onClick={() => toggleTextDecorationLine('underline')}
                  >
                    <FaUnderline />
                  </button>

                  <button
                    className={`kd-btn-check 
          ${textDecorationLine === "line-through" ? "active" : ""}`}

                    onClick={() => toggleTextDecorationLine('line-through')}

                  >
                    <FaStrikethrough />
                  </button>

                </div>
              </div>


              <div className="mb-4">
                <label className="theme-small-text mb-2">
                  Text Transform
                </label>


                <div className="flex space-x-2">
                  <button
                    className={`kd-btn-check 
          ${textTransform === "none" ? " active" : ""}`}
                    onClick={() => {
                      setTextTransform("none");
                      value_update({ textTransform: "none" });
                    }}
                  >
                    <MdOutlineDoNotDisturb />
                  </button>

                  <button
                    className={`kd-btn-check 
          ${textTransform === "uppercase" ? "active" : ""}`}
                    onClick={() => {
                      setTextTransform("uppercase");
                      value_update({ textTransform: "uppercase" });
                    }}
                  >
                    <RxLetterCaseUppercase />
                  </button>

                  <button
                    className={`kd-btn-check 
          ${textTransform === "lowercase" ? "active" : ""}`}
                    onClick={() => {
                      setTextTransform("lowercase");
                      value_update({ textTransform: "lowercase" });
                    }}
                  >
                    <RxLetterCaseLowercase />
                  </button>

                  <button
                    className={`kd-btn-check 
          ${textTransform === "capitalize" ? "active" : ""}`}
                    onClick={() => {
                      setTextTransform("capitalize");
                      value_update({ textTransform: "capitalize" });
                    }}
                  >
                    <RxLetterCaseCapitalize />
                  </button>
                </div>
              </div>





            </div>



            <div className="grid grid-cols-2 gap-4 text-sm text-sky-500 font-medium">
              {/* Width & Height */}
              <div>
                <label className="theme-small-text mb-2">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => {
                    setWidth(Number(e.target.value));
                    value_update({ width: Number(e.target.value) });
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
                    setHeight(Number(e.target.value));
                    value_update({ height: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>



              {/* Position */}
              <div>
                <label className="theme-small-text mb-2">Position X (px)</label>
                <input
                  type="number"
                  value={left}
                  onChange={(e) => {
                    setLeft(Number(e.target.value));
                    value_update({ left: Number(e.target.value) });
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
                    value_update({ top: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>

              {/* Rotation */}
              <div>
                <label className="theme-small-text mb-2">Rotation (°)</label>
                <input
                  type="number"
                  value={rotation}
                  onChange={(e) => {
                    setRotation(Number(e.target.value));
                    value_update({ rotation: Number(e.target.value) });
                  }}
                  className="kd-form-input"
                />
              </div>
            </div>


          </div>

        )}

        {/* Animated Text Options */}
        {activeTab === "animation" && (
          <AnimationHelper active_type={"text"} />
          // <div className="grid grid-cols-2 gap-2 mt-2">

          //   {/* Slide Left */}
          //   <div
          //     // className="animation-btn"
          //     className={`animation-btn ${animationType === "Slide Left" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Slide Left");
          //       value_update({ animationType: "Slide Left" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><LuArrowLeft /></div>
          //       <div className="animate-text">Slide Left</div>
          //     </button>
          //   </div>

          //   {/* Slide Right */}
          //   <div
          //     className={`animation-btn ${animationType === "Slide Right" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Slide Right");
          //       value_update({ animationType: "Slide Right" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><LuArrowRight /></div>
          //       <div className="animate-text">Slide Right</div>
          //     </button>
          //   </div>

          //   {/* Slide Top */}
          //   <div
          //     className={`animation-btn ${animationType === "Slide Top" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Slide Top");
          //       value_update({ animationType: "Slide Top" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><LuArrowUp /></div>
          //       <div className="animate-text">Slide Top</div>
          //     </button>
          //   </div>

          //   {/* Slide Bottom */}
          //   <div
          //     className={`animation-btn ${animationType === "Slide Bottom" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Slide Bottom");
          //       value_update({ animationType: "Slide Bottom" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><LuArrowDown /></div>
          //       <div className="animate-text">Slide Bottom</div>
          //     </button>
          //   </div>

          //   {/* Typewriter */}
          //   <div
          //     className={`animation-btn ${animationType === "Typewriter" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Typewriter");
          //       value_update({ animationType: "Typewriter" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><FaKeyboard /></div>
          //       <div className="animate-text">Typewriter</div>
          //     </button>
          //   </div>



          //   {/* fade in */}
          //   <div
          //     className={`animation-btn ${animationType === "Fade in" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Fade in");
          //       value_update({ animationType: "Fade in" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon">
          //         <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          //           <path d="M3.70625 5.875H28.2938C30.3438 5.875 32 7.53125 32 9.58125V23.4188C32 25.4688 30.3438 27.125 28.2938 27.125H3.70625C1.65625 27.125 0 25.4688 0 23.4188V9.58125C0 7.53125 1.65625 5.875 3.70625 5.875Z" fill="url(#paint0_linear_288_5319)" />
          //           <defs>
          //             <linearGradient id="paint0_linear_288_5319" x1="32" y1="16.5" x2="0" y2="16.5" gradientUnits="userSpaceOnUse">
          //               <stop stopColor="white" stopOpacity="0.3" />
          //               <stop offset="1" stopColor="white" stopOpacity="0" />
          //             </linearGradient>
          //           </defs>
          //         </svg>
          //       </div>
          //       <div className="animate-text">Fade in</div>
          //     </button>
          //   </div>


          //   {/* zoom in */}
          //   <div
          //     className={`animation-btn ${animationType === "Zoom in" ? "animation-btn-active" : ""}`}
          //     onClick={() => {
          //       setanimationType("Zoom in");
          //       value_update({ animationType: "Zoom in" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><FaMagnifyingGlassPlus /></div>
          //       <div className="animate-text">Zoom in</div>
          //     </button>
          //   </div>


          //   {/* zomm out */}
          //   <div
          //     className="animation-btn"
          //     onClick={() => {
          //       setanimationType("Zoom out");
          //       value_update({ animationType: "Zoom out" });
          //     }}
          //   >
          //     <button>
          //       <div className="animate-icon"><FaMagnifyingGlassMinus /></div>
          //       <div className="animate-text">Zoom out</div>
          //     </button>
          //   </div>


          // </div>


        )}
      </div>
    </div>
  );
};

export default TextEditTool;
