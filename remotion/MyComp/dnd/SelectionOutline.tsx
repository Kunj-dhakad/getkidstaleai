// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useCurrentScale } from "remotion";
// import { ResizeHandle } from "./ResizeHandle";
// import { 
//   Allclips,
//   //  setActiveid 
//   } from "../../../app/store/clipsSlice";
//   import {   setActiveid } from "../../../app/store/editorSetting";
// import { useDispatch } from "react-redux";
// import { ContextMenu } from "../../../components/editor/tool/ContextMenupopup";
// import { Animated, Move } from "remotion-animated";
// export const SelectionOutline: React.FC<{
//   item: Allclips;
//   changeItem: (itemId: string, updater: (item: Allclips) => Allclips) => void;
//   setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
//   selectedItem: string | null;
//   isDragging: boolean;
// }> = ({ item, changeItem, setSelectedItem, selectedItem, isDragging }) => {
//   const dispatch = useDispatch();
//   const [contextMenuVisible, setContextMenuVisible] = useState(false);
//   const [zindexlow, setZindexlow] = useState(0)
//   const scale = useCurrentScale();
//   const scaledBorder = Math.ceil(2 / scale);

//   const [hovered, setHovered] = React.useState(false);

//   const onMouseEnter = useCallback(() => {
//     setHovered(true);
//   }, []);

//   const onMouseLeave = useCallback(() => {
//     setHovered(false);
//   }, []);

//   const isSelected = item.id === selectedItem;

//   const style: React.CSSProperties = useMemo(() => {
//     return {
//       width: item.properties.width,
//       height: item.properties.height,
//       left: item.properties.left,
//       top: item.properties.top,
//       rotate: `${item.properties.rotation}deg`,
//       position: "absolute",
//       outline:
//         (hovered && !isDragging) || isSelected
//           ? `${scaledBorder}px solid  var( --kd-theme-primary)`
//           : undefined,
//       userSelect: "none",
//       touchAction: "none",
//       cursor: "move",
//       zIndex: (100 - item.properties.zindex) - zindexlow,
//     };
//   }, [item, hovered, isDragging, isSelected, scaledBorder, zindexlow]);

//   const startDragging = useCallback(
//     (e: PointerEvent | React.MouseEvent) => {
//       const initialX = e.clientX;
//       const initialY = e.clientY;

//       const onPointerMove = (pointerMoveEvent: PointerEvent) => {
//         const offsetX = (pointerMoveEvent.clientX - initialX) / scale;
//         const offsetY = (pointerMoveEvent.clientY - initialY) / scale;
//         changeItem(item.id, (i) => {
//           return {
//             ...i,
//             left: Math.round(item.properties.left + offsetX),
//             top: Math.round(item.properties.top + offsetY),
//             isDragging: true,
//           };
//         });
//       };

//       const onPointerUp = () => {
//         changeItem(item.id, (i) => {
//           return {
//             ...i,
//             isDragging: false,
//           };
//         });
//         window.removeEventListener("pointermove", onPointerMove);
//       };

//       window.addEventListener("pointermove", onPointerMove, { passive: true });
//       window.addEventListener("pointerup", onPointerUp, {
//         once: true,
//       });
//     },

//     [item, scale, changeItem]
//   );

//   const onPointerDown = useCallback(
//     (e: React.MouseEvent) => {
//       e.stopPropagation();
//       if (e.button !== 0) {
//         return;
//       }
//       setSelectedItem(item.id);
//       dispatch(setActiveid(item.id));

//       startDragging(e);
//     },
//     [item.id, setSelectedItem, startDragging, dispatch]
//   );

//   const oncontextmenu = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setContextMenuVisible(true);
//   };

//   useEffect(() => {
//     setContextMenuVisible(false);
//     setZindexlow(0)//add for zindex lower set 

//   }, [isSelected]);


//   const onDoubleClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setZindexlow(30)//add for zindex lower set
//   };



//   const contentElement = (<div
//     onPointerDown={onPointerDown}
//     onPointerEnter={onMouseEnter}
//     onPointerLeave={onMouseLeave}
//     onContextMenu={oncontextmenu}
//     onDoubleClick={onDoubleClick}//add for zindex lower set
//   >
//     <div style={style}>
//       {isSelected ? (
//         <>
//           <ResizeHandle item={item} setItem={changeItem} type="top-left" />
//           <ResizeHandle item={item} setItem={changeItem} type="top-right" />
//           <ResizeHandle item={item} setItem={changeItem} type="bottom-left" />
//           <ResizeHandle
//             item={item}
//             setItem={changeItem}
//             type="bottom-right"
//           />
//         </>
//       ) : null}
//     </div>
//     {isSelected && contextMenuVisible ? (
//       <div
//         style={{
//           left:
//             item.properties.left + item.properties.width + scaledBorder + 20,
//           top: item.properties.top,
//           zIndex: 9999,
//         }}
//         className="text-red-600 absolute "
//       >
//         <ContextMenu Allclip={item} />
//       </div>
//     ) : null}
//   </div>)


//   // const shouldAnimate = "slide down";
//   const [animattype, setanimattype] = useState("normal");
//   if (item.type === "text" || item.type === "image" || item.type === "emoji") {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useEffect(() => {

//       // console.log("item", item.properties.animationType)
//       setanimattype(item.properties.animationType);

//     }, [item.properties.animationType, item.type])
//   }
//   // console.log(animattype)
//   return (
//     <>
//       {animattype === "Slide Top" ? (
//         <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
//           <Animated animations={[Move({ y: -40, start: 1, })]}>
//             {contentElement}
//           </Animated>
//         </div>
//       ) : animattype === "Slide Bottom" ? (
//         <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
//           <Animated animations={[Move({ y: 40, start: 1, })]}>
//             {contentElement}
//           </Animated>
//         </div>
//       ) : animattype === "Slide Left" ? (
//         <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>

//           <Animated animations={[Move({ x: -40, start: 1, })]}>
//             {contentElement}
//           </Animated>
//         </div>
//       ) : animattype === "Slide Right" ? (
//         <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
//           <Animated animations={[Move({ x: 40, start: 1, })]}>
//             {contentElement}
//           </Animated>
//         </div>
//       ) : (
//         contentElement
//       )}
//     </>

//   );
// };
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Easing, useCurrentScale } from "remotion";
import { ResizeHandle } from "./ResizeHandle";
import {
  Allclips,
  //  setActiveid 
} from "../../../app/store/clipsSlice";
import {
  setActiveid,
  //  textsetEditingClipId 
} from "../../../app/store/editorSetting";
import { useDispatch } from "react-redux";
import { ContextMenu } from "../../../components/editor/tool/ContextMenupopup";
import { Animated, CustomEasing, Move, Rotate } from "remotion-animated";
// import { FloatingToolbar } from "../../../components/editor/tool/FloatingToolbar";
export const SelectionOutline: React.FC<{
  item: Allclips;
  changeItem: (itemId: string, updater: (item: Allclips) => Allclips) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  selectedItem: string | null;
  isDragging: boolean;
}> = ({ item, changeItem, setSelectedItem, selectedItem, isDragging }) => {
  const dispatch = useDispatch();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [zindexlow, setZindexlow] = useState(0)
  const scale = useCurrentScale();
  const scaledBorder = Math.ceil(2 / scale);

  const [hovered, setHovered] = React.useState(false);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const isSelected = item.id === selectedItem;

  const style: React.CSSProperties = useMemo(() => {
    return {
      width: item.properties.width,
      height: item.properties.height,
      left: item.properties.left,
      top: item.properties.top,
      rotate: `${item.properties.rotation}deg`,
      position: "absolute",
      outline:
        (hovered && !isDragging) || isSelected
          ? `${scaledBorder}px solid  var( --kd-theme-primary)`
          : undefined,
      userSelect: "none",
      touchAction: "none",
      // cursor: "move",
      cursor: isDragging ? "move" : "default",
      pointerEvents: "auto",
      zIndex: (100 - item.properties.zindex) - zindexlow,
    };
  }, [item, hovered, isDragging, isSelected, scaledBorder, zindexlow]);

  const startDragging = useCallback(
    (e: PointerEvent | React.MouseEvent) => {
      const initialX = e.clientX;
      const initialY = e.clientY;

      const onPointerMove = (pointerMoveEvent: PointerEvent) => {
        const offsetX = (pointerMoveEvent.clientX - initialX) / scale;
        const offsetY = (pointerMoveEvent.clientY - initialY) / scale;
        changeItem(item.id, (i) => {
          return {
            ...i,
            left: Math.round(item.properties.left + offsetX),
            top: Math.round(item.properties.top + offsetY),
            isDragging: true,
          };
        });
      };

      const onPointerUp = () => {
        changeItem(item.id, (i) => {
          return {
            ...i,
            isDragging: false,
          };
        });
        window.removeEventListener("pointermove", onPointerMove);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp, {
        once: true,
      });
    },

    [item, scale, changeItem]
  );

  const onPointerDown = useCallback(
    (e: React.MouseEvent) => {
      // console.log("onPointerDown", item.id);
      e.stopPropagation();
      if (e.button !== 0) {
        return;
      }
      setSelectedItem(item.id);
      dispatch(setActiveid(item.id));

      startDragging(e);
    },
    [item.id, setSelectedItem, startDragging, dispatch]
  );

  const oncontextmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuVisible(true);
  };

  useEffect(() => {
    setContextMenuVisible(false);
    setZindexlow(0)//add for zindex lower set 

  }, [isSelected]);


  // const onDoubleClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setZindexlow(30)//add for zindex lower set
  //   if (item.type === "text") {
  //     console.log("Double clicked on text item:", item.id);
  //     dispatch(textsetEditingClipId(true)); // <-- set edit mode

  //   }
  // };

  // const onclicktrack = () => {
  //   if (isSelected) {
  //     if (item.type === "text") {
  //       setZindexlow(10) //add for zindex lower set
  //       console.log("first click on track")
  //     }

  //   }

  // }

  const contentElement = (<div
    onPointerDown={onPointerDown}
    onPointerEnter={onMouseEnter}
    onPointerLeave={onMouseLeave}
    onContextMenu={oncontextmenu}
  // onClick={onclicktrack}
  // onDoubleClick={onDoubleClick}//add for zindex lower set
  >
    {isSelected && !isDragging &&
      <div
        style={{
          left:
            item.properties.left + (item.properties.width + scaledBorder) / 2,
          top: item.properties.top - 200,
          zIndex: 9999,
        }}
        className="absolute "
      >
        {/* <FloatingToolbar Allclip={item} /> */}
      </div>}
    <div style={style}>
      {isSelected ? (
        <>
          <ResizeHandle item={item} setItem={changeItem} type="top-left" />
          <ResizeHandle item={item} setItem={changeItem} type="top-right" />
          <ResizeHandle item={item} setItem={changeItem} type="bottom-left" />
          <ResizeHandle item={item} setItem={changeItem} type="bottom-right" />
        </>
      ) : null}
    </div>
    {isSelected && contextMenuVisible ? (
      <div
        style={{
          left:
            item.properties.left + item.properties.width + scaledBorder + 20,
          top: item.properties.top,
          zIndex: 9999,
        }}
        className="text-red-600 absolute "
      >
        <ContextMenu Allclip={item} />
      </div>
    ) : null}
  </div>)


  // const shouldAnimate = "slide down";
  // const [animattype, setanimattype] = useState("normal");
  // if (item.type === "text" || item.type === "image" || item.type === "emoji") {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {

  //     // console.log("item", item.properties.animationType)
  //     setanimattype(item.properties.animationType);

  //   }, [item.properties.animationType, item.type])
  // }
  // console.log(animattype)

  // new animation types
  let animation: any = undefined;
  let duration: number = 0;
  if (item.type === "image" && 'animation' in item.properties && 'duration' in item.properties) {
    animation = (item.properties as any).animation;
    duration = (item.properties as any).duration;
  } else if (item.type === "emoji" && 'animation' in item.properties && 'duration' in item.properties) {
    animation = (item.properties as any).animation;
    duration = (item.properties as any).duration;
  } else if (item.type === "video" && 'animation' in item.properties && 'duration' in item.properties) {
    animation = (item.properties as any).animation;
    duration = (item.properties as any).duration;
  } else if (item.type === "text" && 'animation' in item.properties && 'duration' in item.properties) {
    animation = (item.properties as any).animation;
    duration = (item.properties as any).duration;
  }


  const getAnimation = (
    type: "None" | "Fade" | "Zoom" | "Slide" | "Rotate",
    direction: "in" | "out",
    duration: number,
    totalDuration: number,
    slideX = 0,
    slideY = 0,
    degrees = 0
  ): ReturnType<typeof Move> | null => {
    const start = direction === "in" ? 0 : totalDuration - duration;

    switch (type) {

      case "Slide":
        return Move({
          x: slideX,
          y: slideY,
          start,
          duration,
          ease: CustomEasing(Easing.linear)
        });

      case "Rotate":
        return Rotate({
          degrees: degrees,
          start,
          duration,
          ease: CustomEasing(Easing.linear)
        });
      default:
        return null;
    }
  };


  // ✅ Prepare animations and remove nulls
  const animations = [
    getAnimation(
      animation?.in?.type ?? "None",
      "in",
      animation?.in?.duration ?? 0,
      duration,
      animation?.in?.slideDistanceX ?? 0,
      animation?.in?.slideDistanceY ?? 0,
      animation?.in?.degrees ?? 0

    ),
    getAnimation(
      animation?.out?.type ?? "None",
      "out",
      animation?.out?.duration ?? 0,
      duration,
      animation?.out?.slideDistanceX ?? 0,
      animation?.out?.slideDistanceY ?? 0,
      animation?.out?.degrees ?? 0

    ),
  ].filter((a): a is ReturnType<typeof Move> => a !== null);

  return (
    <>
      {item.type === "image" || item.type === "text" || item.type === "emoji" || item.type === "video" ? (

        <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>

          <div
            style={{ height: "100%", width: "100%" }}
            onPointerDown={onPointerDown}
            onPointerEnter={onMouseEnter}
            onPointerLeave={onMouseLeave}
            onContextMenu={oncontextmenu}
          // onClick={onclicktrack}
          // onDoubleClick={onDoubleClick}//add for zindex lower set
          >
            {isSelected && !isDragging &&
              <div
                style={{
                  left:
                    item.properties.left + (item.properties.width + scaledBorder) / 2,
                  top: item.properties.top - 200,
                  zIndex: 9999,
                }}
                className="absolute "
              >
                {/* <FloatingToolbar Allclip={item} /> */}
              </div>}


            <Animated className="absolute" style={style} animations={animations}>
              {isSelected ? (
                <>
                  <ResizeHandle item={item} setItem={changeItem} type="top-left" />
                  <ResizeHandle item={item} setItem={changeItem} type="top-right" />
                  <ResizeHandle item={item} setItem={changeItem} type="bottom-left" />
                  <ResizeHandle item={item} setItem={changeItem} type="bottom-right" />

                </>
              ) : null}
            </Animated>


            {isSelected && contextMenuVisible ? (
              <div
                style={{
                  left:
                    item.properties.left + item.properties.width + scaledBorder + 20,
                  top: item.properties.top,
                  zIndex: 9999,
                }}
                className="text-red-600 absolute "
              >
                <ContextMenu Allclip={item} />
              </div>
            ) : null}
          </div>

        </div>


        // ) : animattype === "Slide Top" ? (
        //   <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
        //     <Animated animations={[Move({ y: -40, start: 1 })]}>
        //       {contentElement}
        //     </Animated>
        //   </div>
        // ) : animattype === "Slide Bottom" ? (
        //   <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
        //     <Animated animations={[Move({ y: 40, start: 1 })]}>
        //       {contentElement}
        //     </Animated>
        //   </div>
        // ) : animattype === "Slide Left" ? (
        //   <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
        //     <Animated animations={[Move({ x: -40, start: 1 })]}>
        //       {contentElement}
        //     </Animated>
        //   </div>
        // ) : animattype === "Slide Right" ? (
        //   <div style={{ zIndex: (100 - item.properties.zindex) - zindexlow }}>
        //     <Animated animations={[Move({ x: 40, start: 1 })]}>
        //       {contentElement}
        //     </Animated>
        //   </div>
      ) : (
        contentElement
      )}
    </>

  );
};


