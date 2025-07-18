// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store/store";
// import { SeekBar } from "../editor/playercontroll/SeekBar";
// import ExampleGrid from "./react-grid-layout";
// // import { SeekBar1 } from "../editor/playercontroll/SeekBar";
// import { PlayerRef } from "@remotion/player";

// //  const Rv = ( ref: React.RefObject<PlayerRef>) => {

// const RV: React.FC<{ playerRef: React.RefObject<PlayerRef> }> = ({
//   playerRef,
// }) => {

//   const totalduration = useSelector(
//     (state: RootState) => state.slices.present.totalduration
//   );
//   const Timelienzoom = useSelector(
//     (state: RootState) => state.slices.present.Timelienzoom
//   );

//   const getBoxInterval = (zoom: number, totalduration: number) => {
//     const durationInMinutes = totalduration / 30 / 60; //30 frmae  60sec

//     let intervalBasedOnDuration;
//     if (durationInMinutes <= 15) {
//       intervalBasedOnDuration = 1;
//     } else if (durationInMinutes <= 30) {
//       intervalBasedOnDuration = 2;
//     } else if (durationInMinutes <= 50) {
//       intervalBasedOnDuration = 5;
//     } else {
//       intervalBasedOnDuration = 10;
//     }

//     let intervalBasedOnZoom;
//     if (zoom >= 150) {
//       intervalBasedOnZoom = 1;
//     } else if (zoom >= 120) {
//       intervalBasedOnZoom = 2;
//     } else if (zoom >= 90) {
//       intervalBasedOnZoom = 5;
//     } else if (zoom >= 60) {
//       intervalBasedOnZoom = 10;
//     } else if (zoom >= 45) {
//       intervalBasedOnZoom = 30;
//     } else if (zoom >= 30) {
//       intervalBasedOnZoom = 60;
//     } else {
//       intervalBasedOnZoom = 30;
//     }

//     return Math.max(intervalBasedOnDuration, intervalBasedOnZoom);
//   };

//   const boxInterval = getBoxInterval(Timelienzoom, totalduration);

//   const boxCount = Math.ceil(
//     Math.max(30, totalduration / 30 / boxInterval) + 20
//   );

//   // Array.from({ length: boxCount }, (_, index) => index * boxInterval);

//   const SeekWidth: number = (totalduration / (boxInterval * 30) * 70)
//   //  console.log("SeekWidth",SeekWidth)
//   return (
//     <div className="w-full h-full  overflow-x-auto  relative">
//       <style jsx>{`
//         .overflow-x-auto {
//           scrollbar-width: thin;
//           // scrollbar-color: #FE1550 #35393d;
//          scrollbar-color: var(--kd-theme-primary) var(--kd-border-color);
//           border-radius: 5px;
//         }

//         .overflow-x-auto::-webkit-scrollbar {
//           height: 5px;
//           width: 5px;
//         }

//         .overflow-x-auto::-webkit-scrollbar-thumb:active {
//           scrollbar-color: var(--kd-theme-primary) var(--kd-border-color); 
//         }

//         // .overflow-x-auto::-webkit-scrollbar-thumb {
//         //   background: #888;
//         //   border-radius: 6px;
//         // }

//         // .overflow-x-auto::-webkit-scrollbar-thumb:hover {
//         //   background: #555;
//         // }

//         // .overflow-x-auto::-webkit-scrollbar-track {
//         //   background: #f1f1f1;
//         // }
//       `}</style>
//       <div className="sticky top-0 z-10 flex">
//         {Array.from(
//           { length: boxCount },
//           (_, index) => index * boxInterval
//         ).map((startTime) => (
//           <div

//             key={startTime}
//             style={{ minWidth: `70px`, minHeight: "30px", backgroundColor: "#3a3238" }}
//             className="flex flex-col items-start  kd-theme-sub-bg  p-1"
//           >
//             <div
//               style={{ marginLeft: "-10px" }}
//               className="text-xs select-none kd-light-color  mb-1">
//               {/* {formatTime(startTime)} */}
//               {formatTime(startTime) || <span>&nbsp;</span>}

//             </div> 


//             <div className="w-full ms-1  flex justify-between items-center">
//               <div className="w-[2px] h-[13px]  bg-[--kd-light-color]"></div>
//               {/* <div className="flex-1 flex justify-center">
//                 <div className="w-[1px] h-[8px] kd-theme-bg-timeline"></div>
//               </div> */}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute top-4">
//         <div className="sticky top-6 z-10">
//           {/* <SeekBar unit={boxInterval * 30} /> */}
//           <div style={{ width: `${SeekWidth}px` }}>
//             <SeekBar
//               durationInFrames={totalduration}
//               inFrame={0}
//               playerRef={playerRef}
//             />
//           </div>
//         </div>
//         <div className="ms-2">
//           <ExampleGrid boxCount={boxCount} unit={boxInterval * 30} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // // Time formatter
// // const formatTime = (time: number) => {
// //   const minutes = Math.floor(time / 60);
// //   const seconds = time % 60;

// //   if (seconds === 0) return `${minutes}m`;
// //   return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}s`;
// // };
// const formatTime = (time: number) => {
//   if (time < 1) return "";
//   const minutes = Math.floor(time / 60).toString().padStart(2, "0");
//   const seconds = (time % 60).toString().padStart(2, "0");

//   return `${minutes}:${seconds}`;
// };

// export default RV;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { SeekBar } from "../editor/playercontroll/SeekBar";
import ExampleGrid from "./react-grid-layout";
// import { SeekBar1 } from "../editor/playercontroll/SeekBar";
import { PlayerRef } from "@remotion/player";

//  const Rv = ( ref: React.RefObject<PlayerRef>) => {

const RV: React.FC<{ playerRef: React.RefObject<PlayerRef> }> = ({
  playerRef,
}) => {

  const totalduration = useSelector(
    (state: RootState) => state.slices.present.totalduration
  );
  const Timelienzoom = useSelector(
    (state: RootState) => state.slices.present.Timelienzoom
  );

  
  const getBoxInterval = (zoom: number, totalduration: number) => {
    const durationInMinutes = totalduration / 30 / 60; //30 frmae  60sec

    let intervalBasedOnDuration;
    if (durationInMinutes <= 15) {
      intervalBasedOnDuration = 1;
    } else if (durationInMinutes <= 30) {
      intervalBasedOnDuration = 2;
    } else if (durationInMinutes <= 50) {
      intervalBasedOnDuration = 5;
    } else {
      intervalBasedOnDuration = 10;
    }

    let intervalBasedOnZoom;
    if (zoom >= 150) {
      intervalBasedOnZoom = 1;
    } else if (zoom >= 120) {
      intervalBasedOnZoom = 2;
    } else if (zoom >= 90) {
      intervalBasedOnZoom = 5;
    } else if (zoom >= 60) {
      intervalBasedOnZoom = 10;
    } else if (zoom >= 45) {
      intervalBasedOnZoom = 30;
    } else if (zoom >= 30) {
      intervalBasedOnZoom = 60;
    } else {
      intervalBasedOnZoom = 30;
    }

    return Math.max(intervalBasedOnDuration, intervalBasedOnZoom);
  };

  const boxInterval = getBoxInterval(Timelienzoom, totalduration);

  const boxCount = Math.ceil(
    Math.max(30, totalduration / 3 / boxInterval) + 20
  ); // 30 is the minimum box count
  // 3 is a (1 box = 3 frame )
  //20 is the extra box count to ensure the scrollbar is always visible


  const SeekWidth: number = (totalduration / (boxInterval * 30) * 100)
  //  console.log("SeekWidth",SeekWidth)
  return (
    <div className="w-full h-full  overflow-x-auto  relative">
      <style jsx>{`
        .overflow-x-auto {
          scrollbar-width: thin;
          // scrollbar-color: #FE1550 #35393d;
         scrollbar-color: var(--kd-theme-primary) var(--kd-border-color);
          border-radius: 5px;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 5px;
          width: 5px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:active {
          scrollbar-color: var(--kd-theme-primary) var(--kd-border-color); 
        }

      `}</style>
      <div className="sticky top-0 z-10 flex ms-1">
        {Array.from(
          { length: boxCount /10+15 },
          (_, index) => index * boxInterval
        ).map((startTime) => (
          <div

            key={startTime}
            style={{ minWidth: `100px`, minHeight: "30px", backgroundColor: "#3a3238" }}
            className="flex flex-col items-start  kd-theme-sub-bg  py-1"
          >
            <div
              style={{ marginLeft: "-10px" }}
              className="text-xs select-none kd-light-color  mb-1">
              {/* {formatTime(startTime)} */}
              {formatTime(startTime) || <span>&nbsp;</span>}

            </div>


            <div className="w-full ms-1  flex justify-between items-center">
              <div className="w-[2px] h-[13px]  bg-[--kd-light-color]"></div>
              {/* <div className="flex-1 flex justify-center">
                <div className="w-[1px] h-[8px] bg-[--kd-light-color] "></div>
              </div> */}
              <div className="flex-1 flex justify-evenly w-full">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[1px] h-[8px] bg-[--kd-light-color] opacity-60"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-4">
        <div className="sticky top-6 z-10">
          <div style={{ width: `${SeekWidth}px` }}>
            <SeekBar
              durationInFrames={totalduration}
              inFrame={0}
              playerRef={playerRef}
            />
          </div>
        </div>
        <div className="ms-2">
          <ExampleGrid boxCount={boxCount} unit={(boxInterval * 30/10)} />
        </div>
      </div>
    </div>
  );
};



const formatTime = (time: number) => {
  if (time < 1) return "";
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export default RV;
