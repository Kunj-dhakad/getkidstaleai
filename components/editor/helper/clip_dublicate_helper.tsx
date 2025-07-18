import { useDispatch, useSelector } from "react-redux";
import {
    updateClip,
    addClip,
} from "../../../app/store/clipsSlice";
import { RootState } from "../../../app/store/store";

export const useClipDuplicateHelper = () => {
    const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);
    const dispatch = useDispatch();
  
    const onDuplicate = (id: string) => {
      const originalClip = Allclips.find((clip) => clip.id === id);
      if (!originalClip) return;
  
      const prefix = id.split('-')[0];
      const newId = `${prefix}-${Date.now()}`;
  
      dispatch(updateClip({
        id: originalClip.id,
        properties: {
          zindex: originalClip.properties.zindex + 1
        }
      }));
  
      const duplicatedClip = {
        ...originalClip,
        id: newId,
        properties: {
          ...originalClip.properties,
          zindex: originalClip.properties.zindex + 1,
        }
      } as typeof originalClip; 
  
      dispatch(addClip(duplicatedClip));
    };
  
    return onDuplicate;
  };
  