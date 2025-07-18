import { useEffect, useState } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { addClip, updateClip, VideoClip } from "../../app/store/clipsSlice";
// import { FaArrowLeft } from "react-icons/fa";
import {
  // MiddleSectionVisibleaction, 
  setBgRemoving
} from "../../app/store/editorSetting";
import { removeVideoBackground } from "../editor/helper/removeBackground";
import ToolbarHeader from "../editor/helper/ToolbarHeader";
import { sendToastToParent } from "../editor/helper/sendToastToParent";

const HeygenVideolist: React.FC = () => {
  const dispatch = useDispatch();

  const projectSettings = useSelector((state: RootState) => state.settings);
  const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);
  const bg_height = useSelector((state: RootState) => state.slices.present.videoheight);
  const bg_width = useSelector((state: RootState) => state.slices.present.videowidth);
  const bgRemovingMap = useSelector((state: RootState) => state.editorTool.bgRemovingMap);

  const [videoData, setVideoData] = useState<{ id: string; url: string; bg_remove_url: string; thumbnail: string; title: string; width: number; height: number; duration: number; }[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [reLoadinglist, setreLoadinglist] = useState(false);
  const [activeTab, setActiveTab] = useState<"Avatar" | "BgRemoveAvatar">("Avatar");

  const bgRemovedVideos = videoData?.filter(video => video.bg_remove_url);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === 'FileUploadedSuccessfully') {
        console.log("FileUploadedSuccessfully done");
        setreLoadinglist(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const formdata = new FormData();
        formdata.append("access_token", projectSettings.access_token);
        formdata.append("video_status", "heygen");

        const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/get-user-avatar-video`, {
          method: "POST",
          body: formdata,
        });

        const data = await response.json();
        setVideoData(data);
      } catch {
        console.error("Error: data not fetched");
      } finally {
        setIsLoading(false);
      }
    };

    fetchdata();
  }, [projectSettings.access_token, projectSettings.api_url, reLoadinglist]);

  function add_video_clip(url: string, thumbnail_url: string, width: number, height: number, duration: number) {
    Allclips.forEach((clip) => {
      dispatch(updateClip({
        ...clip,
        properties: {
          ...clip.properties,
          zindex: clip.properties.zindex + 1,
        },
      }));
    });



    const maxTargetWidth = bg_width;
    const maxTargetHeight = bg_height;

    const widthRatio = maxTargetWidth / width;
    const heightRatio = maxTargetHeight / height;
    const scale = Math.min(widthRatio, heightRatio, 1);

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;


    const newClip: VideoClip = {
      id: `video-${Date.now()}`,
      type: "video",
      properties: {
        src: url,
        start: 0,
        duration: Math.floor(Number(duration) * 30),
        top: bg_height / 2 - height / 2,
        left: bg_width / 2 - width / 2,
        height: scaledHeight,
        width: scaledWidth,
        volume: 0.5,
        rotation: 0,
        zindex: 1,
        TrimStart: 1,
        TrimEnd: Math.floor(Number(duration) * 30),
        videothumbnail: thumbnail_url,
        borderRadius: "0",
        transform: "",
        isDragging: false,
        animationType: ""
      },
    };

    dispatch(addClip(newClip));
  }



  const handleProcess = async (videoUrl: string, id: string) => {
    dispatch(setBgRemoving({ id, value: true }));

    try {
      const url = await removeVideoBackground(videoUrl);

      const formdata = new FormData();
      formdata.append("access_token", projectSettings.access_token);
      formdata.append("video_status", "heygen");
      formdata.append("url", url);
      formdata.append("id", id);

      await fetch(`${projectSettings.api_url}/kdmvideoeditor/add-background-reomove`, {
        method: "POST",
        body: formdata,
      });

      setreLoadinglist(true)
      dispatch(setBgRemoving({ id, value: false }));
      setActiveTab("BgRemoveAvatar");;
      sendToastToParent("Avatar Background removed successfully", "success");
    } catch (err) {
      console.error("Error:", err);
      sendToastToParent("Avatar Background removed successfully", "error");

    }
  };

  return (
    <div className="kd-editor-panel">
      {/* <div className="kd-editor-head flex items-center justify-between text-white mb-4">
      <p className="left-text">Avatar</p>
      <button onClick={toolbarhide} className="toggle-icon">
        <FaArrowLeft />
      </button>
    </div> */}
      <ToolbarHeader title="Avatar" showSetToolbarViewClear={true} />

      <div className="kd-tab-list style-2">
        <button
          onClick={() => setActiveTab("Avatar")}
          className={`kd-tab-btn ${activeTab === "Avatar" ? "active" : ""}`}
        >
          Avatar
        </button>
        <button
          onClick={() => setActiveTab("BgRemoveAvatar")}
          className={`kd-tab-btn ${activeTab === "BgRemoveAvatar" ? "active" : ""}`}
        >
          Transparent Avatar
        </button>
      </div>

      {activeTab === "Avatar" && (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader text-slate-50">Loading...</div>
            </div>
          ) : videoData && videoData.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {videoData.map((video, index) => {
                const isRemoving = bgRemovingMap[video.id];
                return (

                  <div key={index} className="flex flex-col items-center h-full">
                    <div

                      className="relative group overflow-hidden h-full"
                    >
                      {/* IMAGE */}
                      <div className="relative w-full image-box-wrapper">
                        <Image
                          src={isRemoving ? "https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/removeBgLoder.png" : video.thumbnail}
                          width={300}
                          height={300}
                          quality={50}
                          alt={`Video thumbnail ${index + 1}`}
                          className={`w-full h-auto ${isRemoving ? "cursor-wait" : "cursor-pointer"}`}
                        />

                        {/* BUTTONS ON BOX HOVER ONLY, HIDDEN IF LOADING */}
                        {!isRemoving && (
                          <div className="items-center absolute inset-0 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <button
                              onClick={() =>
                                add_video_clip(
                                  video.url,
                                  video.thumbnail,
                                  video.width,
                                  video.height,
                                  video.duration
                                )
                              }
                              className="kd-primary-btn"
                            >
                              Add to Timeline
                            </button>
                            <button
                              onClick={() => handleProcess(video.url, video.id)}
                              className="kd-primary-btn"
                            >
                              Remove BG
                            </button>
                          </div>
                        )}
                      </div>

                      {/* VIDEO TITLE */}

                    </div>
                    <div className="text-white text-sm p-2 w-full overflow-hidden">{video.title}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="kd-white-color text-lg">No videos found</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "BgRemoveAvatar" && (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader text-slate-50">Loading...</div>
            </div>
          ) : bgRemovedVideos && bgRemovedVideos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {bgRemovedVideos.map((video, index) => (
                <div key={index} className="flex flex-col items-center h-full">
                  <div className="image-box-wrapper">
                    <video
                      src={video.bg_remove_url}
                      width={300}
                      height={300}
                      onClick={() =>
                        add_video_clip(video.bg_remove_url, video.thumbnail, video.width, video.height, video.duration)
                      }
                      className="w-full h-auto cursor-pointer"
                    />

                  </div>
                  <div className="text-white text-sm p-2 w-full overflow-hidden">{video.title}</div>
                </div>
              ))}

            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="kd-white-color text-lg">No processed videos found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeygenVideolist;
