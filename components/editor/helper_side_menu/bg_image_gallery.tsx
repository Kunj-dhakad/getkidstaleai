import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip, updateClip, ImageClip } from '../../../app/store/clipsSlice';
import { RootState } from '../../../app/store/store';

const BgImageGallery: React.FC = () => {
    const dispatch = useDispatch();
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);
    const bg_height = useSelector((state: RootState) => state.slices.present.videoheight);
    const bg_width = useSelector((state: RootState) => state.slices.present.videowidth);
    const playercurrentframe = useSelector((state: RootState) => state.slices.present.playertotalframe);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const res = await fetch("/api/getBgImageVideo");
                const data = await res.json();
                setImages(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching elements:", error);
            }
        };
        fetchElements();
    }, []);

    const createClip = (url: string) => {
        Allclips.forEach((clip) => {
            if (clip.id.includes('-bgimage')) {
                dispatch(deleteClip(clip.id));
            } else {
                dispatch(updateClip({
                    ...clip,
                    properties: {
                        ...clip.properties,
                        zindex: clip.properties.zindex + 1
                    }
                }));
            }
        });

        const newClip: ImageClip = {
            id: `image-${Date.now()}-bgimage`,
            type: 'image',
            properties: {
                src: url,
                animationType: "normal",
                width: bg_width,
                height: bg_height,
                opacity: 1,
                start: playercurrentframe,
                duration: 1800,
                maxWidth: 200,
                maxHeight: 200,
                objectFit: "",
                top: 0,
                left: 0,
                zindex: 100,
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
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
                {loading ? (
                    <div className=" kd-white-color col-span-2 flex justify-center items-center h-64 ">Loading images...</div>
                ) : (
                    images.map((image, index) => (
                        <div key={index} className="relative image-box-wrapper">
                            <Image
                                loading="lazy"
                                src={image.url}
                                width={500}
                                height={500}
                                alt={`Image ${index}`}
                                className="cursor-pointer"
                                onClick={() => createClip(image.url)}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BgImageGallery;
