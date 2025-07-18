import { useEffect, useState } from 'react';
import { useBgTemplateSet } from '../../editor/helper/bg_template';
import Image from 'next/image';

const BgTemplate: React.FC = () => {
  const Set_Bg_template = useBgTemplateSet();


  const [textTemplateData, setTexttemplateData] = useState<{ id: string; thumbnail_url: string; json_url: string }[] | undefined>(undefined);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetch_ff = async () => {
      setloading(true);
      try {
        // setLoading(true);
        const response = await fetch("api/getBgtemplate", {
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


  return (
    <div className="kd-editor-panel">

      {/* text template start */}
      <div className="p-2">


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
                  onClick={() => Set_Bg_template(data.json_url)}
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

export default BgTemplate;
