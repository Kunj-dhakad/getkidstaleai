import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClip, VideoClip, updateClip } from "../../../app/store/clipsSlice";
import { createClient } from "pexels";
import { getVideoMetadata } from "@remotion/media-utils";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { RootState } from "../../../app/store/store";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

const skey = process.env.KD_PEXEL_API_KEY;
if (!skey) {
  throw new Error("Pexels API key is not defined");
}
const client = createClient(skey);
const BgVideo: React.FC = () => {

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
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const dispatch = useDispatch();
  const [videos, setVideos] = useState<any[]>([]);


  const [page, setPage] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {

        const response = await client.videos.search({

          query: searchTerm || "Flowers",
          //   orientation: orientation || 'landscape',
          //   size: videosize || 'medium',
          page: page || 1,
          per_page: 20,
        });

        if ("videos" in response) {
          setVideos(response.videos);
          // console.log(response);
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
  }, [searchTerm,
    // orientation,
    //  videosize,
    page]);

  const createClips = (url: string, tmb: string) => {
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
        duration: videoDuration || 120,
        top: 0,
        left: 0,
        height: bg_height,
        width: bg_width,
        volume: 0.5,
        rotation: 0,
        zindex: 99,
        TrimStart: 1,
        TrimEnd: videoDuration || 120,
        videothumbnail: tmb || url,
        isDragging: false,
        borderRadius: "0",
        transform: "",
        animationType: ""
      },
    };
    dispatch(addClip(newClip));
  };

  const compresthumbnail = async (videoUrl: string, imageUrl: string) => {
    try {
      const metadata = await getVideoMetadata(videoUrl);
      setVideoDuration(Math.floor(metadata.durationInSeconds) * 30);
    } catch (error) {
      console.error("Error fetching video metadata:", error);
    }

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

      createClips(videoUrl, compressedThumbnail);
    } catch (error) {
      console.error("Error compressing thumbnail:", error);
    }
  };



  return (
    <div className="kd-editor-panel">
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


      <div className="grid grid-cols-2 gap-2">
        {loading ? (
          <div className=" kd-white-color col-span-2 flex justify-center items-center h-64">Loading videos...</div>
        ) :
          videos.length === 0 ? (
            <div className=" kd-white-color col-span-2 flex justify-center items-center h-64 ">No Record Found</div>

          ) : (
            videos.map((video, index) => (
              <div key={index} className="relative image-box-wrapper">
                <Image
                  src={video.image}
                  width="300"
                  quality={50}
                  height={300}
                  alt=""
                  onClick={() =>
                    compresthumbnail(
                      `${video.video_files[0].link}`,
                      `${video.image}`
                    )
                  }
                  className="w-full h-auto cursor-pointer"
                />
              </div>
            ))
          )}
      </div>

      {/* Pagination Controls */}
      {videos.length > 0 &&  (
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
      )}
    </div>
  );
};

export default BgVideo;
