import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, ImageClip, updateClip } from '../../app/store/clipsSlice';
import { createClient } from 'pexels';
import { RootState } from "../../app/store/store";
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { MiddleSectionVisibleaction, settoolbarview } from '../../app/store/editorSetting';
import { FaAngleLeft, } from "react-icons/fa6";
const client = createClient('563492ad6f91700001000001058a23d1f89841b9ae8060ffd2b5abca');
const ImageGrid: React.FC = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [orientation, setOrientation] = useState<string>('landscape');
  const [imagecolor, setImagecolor] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(true);

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
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

  console.log(playercurrentframe)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // const response = await client.photos.search({ query: searchTerm || 'Nature', per_page: imagesortby, orientation: orientation, });
        //  console.log( "orientation", orientation)
        const response = await client.photos.search({
          query: searchTerm || 'Nature',
          per_page: 20,
          orientation:orientation|| '',
          color: imagecolor || '',
          page: page || 1,
        });
        if ('photos' in response) {
          setImages(response.photos);
        } else {
          console.error('Error fetching images:', response);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, orientation, imagecolor, page]);

  const createclpis = (url: string) => {

    Allclips.forEach((clip) => {
      dispatch(updateClip({ ...clip, properties: { ...clip.properties, zindex: clip.properties.zindex + 1 } }));
    });

    if (imageSize) {
      const newClip: ImageClip = {
        id: `image-${Date.now()}`,
        type: 'image',
        properties: {
          src: url,
          animationType: "normal",
          width: imageSize.width,
          height: imageSize.height,
          opacity: 1,
          start: playercurrentframe,
          duration: 120,
          maxWidth: 200,
          maxHeight: 200,
          objectFit: "",
          top: bg_height / 2 - imageSize.height / 2,
          left: bg_width / 2 - imageSize.width / 2,
          zindex: 1,
          contrast: 100,
          hueRotate: 0,
          saturate: 1,
          blur: 0,
          grayscale: 0,
          sepia: 0,
          brightness: 100,
          rotation: 0,
          borderRadius: "0",
          transform: "",
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
    }
  };

  const handleImageLoad = (event: any) => {
    setImageSize({ width: event.naturalWidth, height: event.naturalHeight });
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

        <div className='flex items-center'>
          <button
            onClick={() => toolbarviewset("Library")} className="toggle-icon"
          >
            <FaAngleLeft />
          </button>

          <p className="ms-1 left-text">Images</p>
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
          placeholder="Search..."
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
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>

          </select>
        </div>
        <div className='w-full'>
          <select className="kd-form-input" onChange={(e) => setImagecolor(e.target.value)} >
            <option value="">All</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="pink">pink</option>
            <option value="violet">violet</option>
            <option value="blue">blue</option>
            <option value="black">black</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {loading ? (
          <div className="col-span-2  text-center text-white">Loading images...</div>

        ) : (
          images.map((image, index) => (
            <div key={index} className="relative image-box-wrapper">
              <Image
                src={image.src.large}
                width={image.width}
                height={image.height}
                alt={`Image ${index}`}
                className="cursor-pointer"
                onClick={() => createclpis(image.src.original)}
                onLoadingComplete={handleImageLoad}
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

export default ImageGrid;


