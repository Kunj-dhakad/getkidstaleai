import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClip, VideoClip, updateClip } from "../../app/store/clipsSlice";
import { createClient } from "pexels";
// import { getVideoMetadata } from "@remotion/media-utils";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { RootState } from "../../app/store/store";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { MiddleSectionVisibleaction, settoolbarview } from "../../app/store/editorSetting";
import { FaAngleLeft, } from "react-icons/fa6";

const skey = process.env.KD_PEXEL_API_KEY;
if (!skey) {
  throw new Error("Pexels API key is not defined");
}
const client = createClient(skey);
const VideoGrid: React.FC = () => {

  const playercurrentframe = useSelector(
    (state: RootState) => state.slices.present.playertotalframe
  );
  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );
  const bg_height = useSelector(
    (state: RootState) => state.slices.present.videoheight
  );
  const bg_width = useSelector(
    (state: RootState) => state.slices.present.videowidth
  );
  // const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const dispatch = useDispatch();
  const [videos, setVideos] = useState<any[]>([]);

  const [orientation, setOrientation] = useState<string>('landscape');
  const [videosize, setVideoSize] = useState<string>('medium');
  const [page, setPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {

        const response = await client.videos.search({

          query: searchTerm || "Nature",
          orientation: orientation || 'landscape',
          size: videosize || 'medium',
          page: page || 1,
          per_page: 20,
        });

        if ("videos" in response) {
          setVideos(response.videos);
          console.log(response);
        } else {
          console.error("Error fetching videos:", response);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm, orientation, videosize, page]);

  // const createClips = (url: string, tmb: string) => {
  //   Allclips.forEach((clip) => {
  //     dispatch(
  //       updateClip({
  //         ...clip,
  //         properties: {
  //           ...clip.properties,
  //           zindex: clip.properties.zindex + 1,
  //         },
  //       })
  //     );
  //   });
  //   const newClip: VideoClip = {
  //     id: `video-${Date.now()}`,
  //     type: "video",
  //     properties: {
  //       src: url,
  //       start: playercurrentframe,
  //       duration: videoDuration || 120,
  //       top: bg_height / 2 - 180,
  //       left: bg_width / 2 - 320,
  //       height: 360,
  //       width: 640,
  //       volume: 0.5,
  //       rotation: 0,
  //       zindex: 1,
  //       TrimStart: 1,
  //       TrimEnd: videoDuration || 120,
  //       videothumbnail: tmb || url,
  //       isDragging: false,
  //       borderRadius: "0",
  //       transform: "",
  //       animation: {
  //         in: {
  //           type: 'None',
  //           duration: 0,
  //           slideDistanceX: undefined,
  //           slideDistanceY: undefined,
  //           degrees: undefined
  //         },
  //         out: {
  //           type: 'None',
  //           duration: 0,
  //           slideDistanceX: undefined,
  //           slideDistanceY: undefined,
  //           degrees: undefined
  //         }
  //       }
  //     },
  //   };
  //   dispatch(addClip(newClip));
  // };

  // const compresthumbnail = async (videoUrl: string, imageUrl: string) => {
  //   try {
  //     const metadata = await getVideoMetadata(videoUrl);
  //     setVideoDuration(Math.floor(metadata.durationInSeconds) * 30);
  //   } catch (error) {
  //     console.error("Error fetching video metadata:", error);
  //   }

  //   const response = await fetch(imageUrl);
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch image: ${response.statusText}`);
  //   }

  //   const imageBlob = await response.blob();

  //   const imageFile = new File([imageBlob], "image.jpg", {
  //     type: "image/jpeg",
  //   });

  //   const options = {
  //     maxSizeMB: 0.0009,
  //     maxWidthOrHeight: 100,
  //     useWebWorker: true,
  //   };

  //   try {
  //     const compressedFile = await imageCompression(imageFile, options);

  //     const compressedThumbnail =
  //       await imageCompression.getDataUrlFromFile(compressedFile);

  //     createClips(videoUrl, compressedThumbnail);
  //   } catch (error) {
  //     console.error("Error compressing thumbnail:", error);
  //   }
  // };

  const createClips = (url: string, tmb: string, h: number, w: number, duration: number,) => {

    const maxTargetWidth = bg_width;
    const maxTargetHeight = bg_height;

    const widthRatio = maxTargetWidth / w;
    const heightRatio = maxTargetHeight / h;
    const scale = Math.min(widthRatio, heightRatio, 1);

    const scaledWidth = w * scale;
    const scaledHeight = h * scale;


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
        duration: duration * 30 || 120,
        top: bg_height / 2 - scaledHeight / 2,
        left: bg_width / 2 - scaledWidth / 2,
        height: scaledHeight,
        width: scaledWidth,
        volume: 0.5,
        rotation: 0,
        zindex: 1,
        TrimStart: 1,
        TrimEnd: duration * 30 || 120,
        videothumbnail: tmb || url,
        isDragging: false,
        borderRadius: "0",
        transform: "",
        animationType: ""
      },
    };
    dispatch(addClip(newClip));
  };
 const compresthumbnail = async (videoUrl: string, imageUrl: string, h: number, w: number, duration: number) => {

  
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBlob = await response.blob();

    const imageFile = new File([imageBlob], "image.jpg", {
      type: "image/jpeg",
    });

    const options = {
      maxSizeMB: 0.0009,
      maxWidthOrHeight: 100,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      const compressedThumbnail =
        await imageCompression.getDataUrlFromFile(compressedFile);

      createClips(videoUrl, compressedThumbnail, h, w, duration);
    } catch (error) {
      console.error("Error compressing thumbnail:", error);
    }
  };


  const toolbarhide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(MiddleSectionVisibleaction(false));
  }
  const toolbarviewset = (view: string) => {
    dispatch(settoolbarview(view));
  }

  return (
    <div className="kd-editor-panel">

      <div className="kd-editor-head flex items-center justify-between text-white mb-4">

        <div className='flex items-center '>

          <button
            onClick={() => toolbarviewset("Library")} className="toggle-icon"
          >
            <FaAngleLeft />
          </button>

          <p className="ms-1 left-text">Video</p>
        </div>



        <button onClick={toolbarhide} className="toggle-icon">
          <Image
            width={18}
            height={18}

            src="https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/image/collapse.svg"
            alt="Collapse Icon"
          />
        </button>
      </div>

      {/* Search Input */}
      <div className="search-bar right-icon mb-4">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full kd-form-input search"
        />
      </div>

      {/* orientation and sort image */}
      <div className='grid grid-cols-2 gap-2 mb-4'>
        <div className='w-full'>
          <select className="kd-form-input" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            {/* <option value="">All</option> */}
            <option value="landscape">landscape</option>
            <option value="portrait">portrait</option>
            <option value="square">Square</option>

          </select>
        </div>
        <div className='w-full'>
          <select className="kd-form-input" value={videosize} onChange={(e) => setVideoSize(e.target.value)} >
            {/* <option value="">All Sizes</option> */}
            <option value="large">large(4K)</option>
            <option value="medium">medium(Full HD)</option>
            <option value="small">small(HD)</option>

          </select>
        </div>
      </div>




      <div className="grid grid-cols-2 gap-2">
        {loading ? (
          <div className="col-span-2 text-center  kd-white-color">Loading videos...</div>
        ) : (
          videos.map((video, index) => (
            <div key={index} className="relative image-box-wrapper">
              <Image
                src={video.image}
                width="300"
                quality={50}
                height={300}
                alt=""
                // onClick={() =>
                //   compresthumbnail(
                //     `${video.video_files[0].link}`,
                //     `${video.image}`
                //   )
                // }
                  onClick={() =>
                  compresthumbnail(
                    `${video.video_files[0].link}`,

                    `${video.image}`,
                    video.video_files[0].height,
                    video.video_files[0].width,
                    video.duration
                  )
                }
                className="w-full h-auto cursor-pointer"
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-wrapper flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button
            className="kd-pagination-btn disabled:opacity-50 w-[32px] p-[0]"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <FaArrowLeft style={{ minWidth: "fit-content" }} />
          </button>

          <button
            className="kd-pagination-btn"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
            <FaArrowRight />
          </button>
        </div>
        <span className="page-count-text theme-small-text">Page {page}</span>
      </div>

    </div>
  );
};

export default VideoGrid;
