import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  updateVideoSettings,
  settotalduration,
  addClip,
  resetAllclips,
} from "../../app/store/clipsSlice";
import { Allclips } from "../../app/store/clipsSlice";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../app/store/store";
import ToolbarHeader from "../editor/helper/ToolbarHeader"
import { RiArrowDownSLine } from "react-icons/ri";


const Template: React.FC = () => {
  const dispatch = useDispatch();
  const projectSettings = useSelector((state: RootState) => state.settings);


  const Set_template = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const jsonData = await response.json();
      // console.log("response", jsonData.inputProps);
      const payload = JSON.parse(jsonData.inputProps.payload);

      // console.log("videoWidth", payload.videoWidth);
      dispatch(resetAllclips());


      dispatch(
        updateVideoSettings({
          videowidth: payload.videoWidth,
          videoheight: payload.videoHeight,
          videobg: payload.videobg,
        })
      );
      dispatch(settotalduration(payload.durationInFrames));

      payload.Allclips.forEach((clip: Allclips) => {
        dispatch(addClip(clip));
      });

    } catch (err) {

    }
  }


  const [templateData, settemplateData] = useState<{ id: string; thumbnail_url: string; json_url: string; template_category: string; template_type: string; }[] | undefined>(undefined);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true)
      try {

        const formdata = new FormData();
        formdata.append("access_token", projectSettings.access_token);
        const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-default-template`, {
          method: "POST",
          body: formdata,
        });
        const data = await response.json();

        settemplateData(data);
        // console.log(data)
        setloading(false)

      } catch {
        console.error("erroe data not fetched")
      } finally {

      } ``
    }
    fetchdata()
  }, [])

  const template_catagary = [
    { id: 0, name: 'All', value: 'all' },
    { id: 1, name: 'Plain Bg', value: 'Plain_Bg' },
    { id: 2, name: 'Advertisement', value: 'advertisement' },
    { id: 3, name: 'Ecommerce', value: 'ecommerce' },
    { id: 4, name: 'Learning & Development', value: 'learningdevelopment' },
    { id: 5, name: 'Explainer Video', value: 'explainervideo' },
    { id: 6, name: 'Social Media', value: 'socialmedia' },
    { id: 7, name: 'Business Card', value: 'businesscard' },
    { id: 8, name: 'Health & Medical', value: 'healthandmedical' },
    { id: 9, name: 'Festival', value: 'festival' },
    { id: 10, name: 'Breaking News', value: 'brekingnews' },
    { id: 11, name: 'Other', value: 'other' },
  ];


  const [selected, setSelected] = useState(template_catagary[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const [catagrayI_wise_template, setcatagrayI_wise_template] = useState<{ id: string; thumbnail_url: string; json_url: string; template_category: string; template_type: string; }[] | undefined>(undefined)

  useEffect(() => {
    if (selected.value === "all") {
      setcatagrayI_wise_template(templateData)

    } else {
      const filteredTemplateData = templateData?.filter((template) => {
        return template.template_category === selected.value.toLowerCase();
      });
      setcatagrayI_wise_template(filteredTemplateData)
      // console.log("filteredTemplateData", filteredTemplateData)
    }




  }, [templateData, selected])



  // template filterd data

  return (
    <div className="kd-editor-panel">

      <ToolbarHeader title="Template" showSetToolbarViewClear={true} />


      <div className="kd-dropdown-container" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="kd-dropdown-toggle"
        >
          {selected.name}
          <RiArrowDownSLine className="kd-dropdown-arrow" />
        </button>

        {isOpen && (
          <div className="kd-dropdown-menu">
            {template_catagary.map((tc) => (
              <div
                key={tc.id}
                onClick={() => {
                  setSelected(tc);
                  setIsOpen(false);
                }}
                className={`kd-dropdown-item ${selected.id === tc.id ? 'kd-selected' : ''}`}
              >
                {tc.name}
              </div>
            ))}
          </div>
        )}
      </div>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader kd-white-color">Loading...</div>
        </div>
      ) : catagrayI_wise_template && catagrayI_wise_template.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mt-4 ">
          {catagrayI_wise_template.map((template, index) => (
            <div key={index} className=" image-box-wrapper">
              <Image
                src={template.thumbnail_url}
                width={300}
                height={300}
                quality={50}
                alt={`Video thumbnail for video ${index + 1}`}
                onClick={() => { Set_template(template.json_url) }}
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
  );
};

export default Template;
