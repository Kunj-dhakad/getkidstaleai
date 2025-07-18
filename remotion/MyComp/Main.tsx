import React, { useState, useEffect, useCallback } from "react";
import { AbsoluteFill, Sequence, } from "remotion";
import { z } from "zod";
import { SvgFetcher } from "./sub_main/svgFetcher";
import { ImageRenderer } from "./sub_main/ImageRenderer"
import VideoRenderer from "./sub_main/VideoRenderer"
import TextRenderer from "./sub_main/textRenderer"
import { useDispatch, useSelector } from "react-redux";
import { Allclips, updateClip,
  //  setActiveid 
  } from "../../app/store/clipsSlice";
import {  setActiveid } from "../../app/store/editorSetting";

import { RootState } from "../../app/store/store";
import { CompositionProps } from "../../types/constants";
import { SortedOutlines } from "./dnd/SortedOutlines";
import AudioRenderer from "./sub_main/audioRenderer";
import WatermarkRenderer from "./sub_main/watermarkRenderer";
import { GifRenderer } from "./sub_main/GifRenderer";

export const Main = ({
  videobg,
  Allclips,
  videoHeight,
  videoWidth,
  Watermark,
}: z.infer<typeof CompositionProps>) => {

  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // console.log("selectedItem", selectedItem);
  const [localItems, setLocalItems] = useState<Allclips[]>(Allclips);

  // const activeClip = useSelector(
  //   (state: RootState) => state.slices.present.Activeid
  // );

    const activeClip = useSelector(
      (state: RootState) => state.editorTool.Activeid
    );
  

  useEffect(() => {
    setSelectedItem(activeClip);
  }, [activeClip]);

  useEffect(() => {
    setLocalItems(Allclips);
  }, [Allclips]);

  const changeItem = useCallback(
    (itemId: string, updater: (item: Allclips) => Partial<Allclips>) => {
      setLocalItems((oldItems) =>
        oldItems.map((item) => {
          if (item.id === itemId) {
            const updatedItem = updater(item) || {};
            return {
              ...item,
              properties: {
                ...item.properties,
                ...(updatedItem as Allclips["properties"]),
              },
            } as Allclips;
          }
          return item;
        })
      );
    },
    []
  );

  const updateReduxOnDrop = useCallback(() => {
    localItems.forEach((item) => {
      // dispatch(updateClip({ id: item.id, properties: item.properties }));
      dispatch(updateClip({ id: item.id, properties: { left: item.properties.left, top: item.properties.top, height: item.properties.height, width: item.properties.width } }));

    });
  }, [localItems, dispatch]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      setSelectedItem(null);
      dispatch(setActiveid(''));
    },
    [setSelectedItem, dispatch]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      updateReduxOnDrop();
    },
    [updateReduxOnDrop]
  );

  // console.log("activeClip", Allclips);
  return (
    <AbsoluteFill
    style={{
      backgroundColor: videobg,
      // backgroundImage: `url("https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/extra/Frame%2057.png")`,
    }}
    
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {localItems.map((clip, index) => {
          return (
            <Sequence
              key={clip.id}
              from={clip.properties.start}
              durationInFrames={clip.properties.duration}
              layout="none"
            >
              <div className="clip-container"
              >
                {clip.type === "text" && (<TextRenderer clip={clip} />)}

                {clip.type === "image" && (<ImageRenderer clip={clip} />)}

                {clip.type === "video" && (<VideoRenderer clip={clip} />)}

                {clip.type === "audio" && <AudioRenderer clip={clip} />}

                {clip.type === "emoji" && (<SvgFetcher clip={clip} />)}
                 {clip.type === "gif" && (<GifRenderer clip={clip} />)}
              </div>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      <SortedOutlines
        selectedItem={selectedItem}
        items={localItems}
        setSelectedItem={setSelectedItem}
        changeItem={changeItem}
      />

      {Watermark.length > 0 && Watermark[0]?.watermark_permission === true &&
        <WatermarkRenderer url={Watermark[0].watermark_url} />
      }

    </AbsoluteFill>
  );
};
