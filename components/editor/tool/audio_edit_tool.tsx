
import React, { useEffect, useState } from "react";
import {
  // updateClip,
  deleteClip,
  updateClip,
  // Allclips,
  // addClip,
  // setActiveid,
  // AudioClip,
  // setActiveid,
} from "../../../app/store/clipsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";


const AudioEditTool: React.FC = () => {
  const dispatch = useDispatch();

  const [volume, setVolume] = useState(1);

  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );

  // const Activeid = useSelector(
  //   (state: RootState) => state.slices.present.Activeid
  // );
  const Activeid = useSelector(
    (state: RootState) => state.editorTool.Activeid
  );



  useEffect(() => {
    const activeClip = Allclips.find(clip => clip.id === Activeid);
    // console.log(activeClip?.properties);
    if (activeClip?.type === "audio") {
      setVolume(activeClip.properties.volume)
    }
  }, [Activeid, Allclips]);


  const update_value = (updateproperties: Partial<any>) => {
    dispatch(updateClip({
      id: Activeid, properties: {
        volume,
        ...updateproperties
      }
    }))
  }



  // const onDuplicate = () => {
  //   const activeAudio = Allclips.find((clip) => clip.id === Activeid) as AudioClip | undefined;
  //   console.log(activeAudio)
  //   if (!activeAudio) return;

  //   dispatch(addClip({
  //     id: `audio-${Date.now()}`,
  //     type: 'audio',
  //     properties: {
  //       ...activeAudio.properties,
  //     }
  //   }));
  // };

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteClip(Activeid));
  };

  return (
    <div>
      {/* Control Panel */}
      <div className="mt-2 shadow rounded ">
        <h2 className="text-xl font-semibold mb-4 text-white"> Audio Edit Properties</h2>

        {/* Volume */}
        <div>
          <label className="block font-medium mb-2 text-white">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              update_value({ volume: Number(e.target.value) });
            }}
            className="w-full kd-range-input"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* <div>
            <button onClick={onDuplicate} type="button" className="focus:outline-none  bg-green-700 hover:bg-green-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 ">Dublicate</button>
          </div> */}
          <div>
            <button onClick={onDelete} type="button" className="kd-primary-btn ">Delete</button>
          </div>
        </div>

      </div>
    </div>
  )

}

export default AudioEditTool;