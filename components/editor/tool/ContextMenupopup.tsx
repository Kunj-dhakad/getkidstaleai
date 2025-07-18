import React, { useEffect } from "react";
import {
  updateClip,
  deleteClip,
  Allclips,
  addClip,
  // setActiveid,
  // setActiveid,
} from "../../../app/store/clipsSlice";

// import { setActiveid } from "../../../app/store/editorSetting";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
// import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";

type ContextMenuProps = {
  Allclip: Allclips;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({ Allclip }) => {
  const Allclips = useSelector(
    (state: RootState) => state.slices.present.Allclips
  );


  const dispatch = useDispatch();

  // const onEdit = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   dispatch(setActiveid(Allclip.id))
  // };

  const onDuplicate = () => {

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

    const prefix = Allclip.id.split('-')[0];
    const newId = `${prefix}-${Date.now()}`;
    const duplicatedClip = {
      ...Allclip,
      id: newId,
    };


    dispatch(addClip(duplicatedClip));
  };


  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteClip(Allclip.id));
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        dispatch(deleteClip(Allclip.id));

      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, Allclip.id]);



  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     event.preventDefault();
  //    console.log(`Key pressed: ${event.key}`);
  //     if (event.ctrlKey && event.key === 'd') {
  //       onDuplicate();
  //     }
     

  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [onDuplicate]);






  return (
    <div className="option-toolbar">

      <button
        className="toolbar-box"
        onClick={onDuplicate}
      >
        <IoDuplicateOutline className="tool-icon" />
      </button>
      <button
        className="toolbar-box"
        onClick={onDelete}
      >
        <MdDelete className="tool-icon" />
      </button>
    </div>
  );
};
