import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, ImageClip, updateClip } from '../../../app/store/clipsSlice';
import { RootState } from "../../../app/store/store";


const ImageList: React.FC = ({ }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<any[]>([]);

  // console.log("ImageList",images)
  const [loading, setLoading] = useState<boolean>(true);
  const [reLoadinglist, setreLoadinglist] = useState(false);

  const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);

  const projectSettings = useSelector((state: RootState) => state.settings);

  const bg_height = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const bg_width = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );
  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.data.action === 'FileUploadedSuccessfully') {
        // console.log("FileUploadedSuccessfully done");
        // setreLoadinglist(true);
        setreLoadinglist(prev => !prev);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };

  }, []);



  useEffect(() => {
    const fetchdata = async () => {
      try {

        const formdata = new FormData();
        formdata.append("access_token", projectSettings.access_token);
        const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-user-images`, {
          method: "POST",
          body: formdata,
        });
        const data = await response.json();

        setImages(data);
        // console.log( "image data", data)
      } catch {
        console.error("erroe data not fetched")
      } finally {
        setLoading(false);
      }
    }
    fetchdata()
  }, [projectSettings.access_token, projectSettings.api_url, reLoadinglist])



  const createclpis = (url: string, w: number, h: number) => {
    // console.log("createclpis", url, w, h)

    const defaultWidth = 500;
    const defaultHeight = 500;

    const originalWidth = w > 0 ? w : defaultWidth;
    const originalHeight = h > 0 ? h : defaultHeight;
    const maxTargetWidth = bg_width;
    const maxTargetHeight = bg_height;
    const widthRatio = maxTargetWidth / originalWidth;
    const heightRatio = maxTargetHeight / originalHeight;
    const scale = Math.min(widthRatio, heightRatio, 1);

    const scaledWidth = originalWidth * scale;
    const scaledHeight = originalHeight * scale;



    Allclips.forEach((clip) => {
      dispatch(updateClip({ ...clip, properties: { ...clip.properties, zindex: clip.properties.zindex + 1 } }));
    });


    const newClip: ImageClip = {
      id: `image-${Date.now()}`,
      type: 'image',
      properties: {
        src: url,
        animationType: "normal",
        width: scaledWidth,
        height: scaledHeight,
        opacity: 1,
        start: playercurrentframe,
        duration: 120,
        maxWidth: 200,
        maxHeight: 200,
        objectFit: "",
        top: bg_height / 2 - scaledHeight / 2,
        left: bg_width / 2 - scaledWidth / 2,
        zindex: 1,
        contrast: 100,
        hueRotate: 0,
        saturate: 1,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        borderRadius: "0",
        transform: "",
        brightness: 100,
        rotation: 0,

        isDragging: false,
        animation: {
          in: {
            type: 'None',
            duration: 0,
            slideDistanceX: undefined,
            slideDistanceY: undefined,
            degrees: undefined
          },
          out: {
            type: 'None',
            duration: 0,
            slideDistanceX: undefined,
            slideDistanceY: undefined,
            degrees: undefined
          }
        }
      },
    };
    dispatch(addClip(newClip));

  };



  return (

    <div className="p-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader kd-white-color">Loading...</div>
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="image-box-wrapper">
              <Image
                src={image.url}
                width={200}
                height={200}
                alt={`Image ${index}`}
                className="w-full h-auto cursor-pointer"
                onClick={() => createclpis(image.url, image.width, image.height)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="kd-white-color text-lg">No images found</p>
        </div>
      )}
    </div>
  );
};

export default ImageList;
