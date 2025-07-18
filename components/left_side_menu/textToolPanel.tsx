import { useDispatch, useSelector } from 'react-redux';
import { addClip, TextClip, updateClip } from '../../app/store/clipsSlice';
import { RootState } from "../../app/store/store";
// import { FaArrowLeft } from 'react-icons/fa';
// import { MiddleSectionVisibleaction } from '../../app/store/editorSetting';
import { useEffect, useState } from 'react';
import { useTextTemplateSet } from '../editor/helper/text_template_add_helper';
import Image from 'next/image';
import ToolbarHeader from '../editor/helper/ToolbarHeader';

const TextToolPanel: React.FC = () => {
  const Set_text_template = useTextTemplateSet();

  const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);
  const bg_height = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const bg_width = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );
  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );
  const dispatch = useDispatch();

  const createclpis = (type: 'text' | 'heading' | 'subheading' | 'Fade In' | 'Typewriter' | 'Slide Top' | 'Slide Bottom' | 'Slide Left' | 'Slide Right' | 'Scale' | 'Shrink') => {


    Allclips.forEach((clip) => {
      dispatch(updateClip({ ...clip, properties: { ...clip.properties, zindex: clip.properties.zindex + 1 } }));
    });


    const newClip: TextClip = {
      id: `${type}-${Date.now()}`,
      type: 'text',
      properties: {
        animationType: `${type}`,
        // subtype: `${type}`,
        fontFamily: 'Roboto',
        fontSize: type === 'heading' ? 75 : type === 'subheading' ? 50 : 30,
        fontWeight: type === 'heading' ? 'bold' : 'normal',
        textColor: "#ffffff",
        text: type === 'heading' ? 'Add a heading' : type === 'subheading' ? 'Add a subheading' : 'Add a text',
        textAlign: "center",
        opacity: 100,
        start: playercurrentframe,
        duration: 120,
        // top: 360,
        // left: 280,

        top: bg_height / 2 - 100,
        left: bg_width / 2 - 350,

        width: 700,
        height: 140,
        zindex: 1,
        rotation: 0,
        textDecorationLine: 'none',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1,
        fontstyle: 'normal',
        isDragging: false,
      },
    };
    dispatch(addClip(newClip));

  }

  const [textTemplateData, setTexttemplateData] = useState<{ id: string; thumbnail_url: string; json_url: string }[] | undefined>(undefined);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetch_ff = async () => {
      setloading(true);
      try {
        // setLoading(true);
        const response = await fetch("api/getTextTemplate", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const finalData = await response.json();
        setTexttemplateData(finalData.data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      } finally {
        setloading(false);
      }
    };

    fetch_ff();
  }, []);


  // const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   dispatch(MiddleSectionVisibleaction(false));
  // }
  return (
    <div className="kd-editor-panel">
      {/* <div className="kd-editor-head flex items-center justify-between text-white mb-4">
        <p className="left-text">Text</p>
        <button onClick={toolbarhide} className="toggle-icon">
        

          <img src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/collapse.svg" alt="" />
        </button>
              
       

      </div> */}

      <ToolbarHeader title="Text" showSetToolbarViewClear={true} />

      <div className="flex flex-col gap-2">
        {/* Basic Text Options */}

        <div
          className="text-option text-[32px] font-semibold">
          <button onClick={() => createclpis("heading")}> Add a heading</button>
        </div>
        <div
          className="text-option text-[22px] font-medium">
          <button onClick={() => createclpis("subheading")}> Add a subheading</button>
        </div>
        <div
          className="text-option text-[16px] font-normal">
          <button onClick={() => createclpis("text")}>  Add body text </button>

        </div>


      </div>

      {/* text template start */}
      <div  className="p-2">


        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader text-slate-50">Loading...</div>
          </div>
        ) : textTemplateData && textTemplateData.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {textTemplateData.map((data, index) => (
              <div key={index} className="image-box-wrapper">
                <Image
                  src={data.thumbnail_url}
                  width={300}
                  height={300}
                  quality={50}
                  alt={`Video thumbnail for video ${index + 1}`}
                  onClick={() => Set_text_template(data.json_url)}
                  className="w-full h-auto cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="kd-white-color text-lg">No template found</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default TextToolPanel;
