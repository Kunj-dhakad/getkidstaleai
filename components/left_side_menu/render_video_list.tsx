import { useEffect, useState } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { addClip, updateClip, VideoClip } from "../../app/store/clipsSlice";
import { FaArrowLeft } from "react-icons/fa";
import { MiddleSectionVisibleaction } from "../../app/store/editorSetting";


const RenderVideolist: React.FC = () => {
  const dispatch = useDispatch();
  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );
  const projectSettings = useSelector((state: RootState) => state.settings);
  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );
  const bg_height = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const bg_width = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );
  const [videoData, setVideoData] = useState<{ url: string; thumbnail: string; width: number; height: number; duration: number; }[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [reLoadinglist, setreLoadinglist] = useState(false);


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.data.action === 'FileUploadedSuccessfully') {
        console.log("FileUploadedSuccessfully done");
        setreLoadinglist(true);
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
        formdata.append("video_status", "render");
        const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-user-video`, {
          method: "POST",
          body: formdata,
        });
        const data = await response.json();

        setVideoData(data);
        console.log(data)
      } catch {
        console.error("erroe data not fetched")
      } finally {
        setIsLoading(false);
      }
    }
    fetchdata()
  }, [projectSettings.access_token, projectSettings.api_url, reLoadinglist])


  function add_video_clip(url: string, thumbnail_url: string, width: number, height: number, duration: number) {

    Allclips.forEach((clip) => {
      dispatch(
        updateClip({
          ...clip,
          properties: {
            ...clip.properties,
            zindex: clip.properties.zindex + 1,
          },
        })
      );
    });
    const newClip: VideoClip = {
      id: `video-${Date.now()}`,
      type: "video",
      properties: {
        src: url,
        start: playercurrentframe,
        duration: Math.floor(Number(duration) * 30),
        top: bg_height / 2 - height / 4,
        left: bg_width / 2 - width / 4,
        height: height / 2,
        width: width / 2,
        volume: 0.5,
        rotation: 0,
        zindex: 1,
        TrimStart: 1,
        TrimEnd: Math.floor(Number(duration) * 30), //add daynemic duration 
        videothumbnail: thumbnail_url,
        borderRadius: "0",
        transform: "",
        isDragging: false,
        animationType: ""
      },
    };
    dispatch(addClip(newClip));

  }


  const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(MiddleSectionVisibleaction(false));
  }
  return (
    <div className="kd-editor-panel">

      <div className="kd-editor-head flex items-center justify-between text-white mb-4">
        <p className="left-text">Render video list</p>
        <button onClick={toolbarhide} className="toggle-icon">
          <FaArrowLeft />
        </button>
        {/* <a href="javascript:void(0);" className="toggle-icon">
          <FaArrowLeft />
        </a> */}
      </div>

      {/* <h2 className="text-lg mb-2 font-bold text-sky-700"> Render video list </h2> */}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader kd-white-color">Loading...</div>
        </div>
      ) : videoData && videoData.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {videoData.map((video, index) => (
            <div key={index} className=" image-box-wrapper">
              <Image
                src={video.thumbnail}
                width={300}
                height={300}
                quality={50}
                alt={`Video thumbnail for video ${index + 1}`}
                onClick={() =>
                  add_video_clip(video.url, video.thumbnail, video.width, video.height, video.duration)
                }
                className="w-full h-auto cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="kd-white-color text-lg">No videos found</p>
        </div>
      )}
    </div>
  )
}
export default RenderVideolist;

