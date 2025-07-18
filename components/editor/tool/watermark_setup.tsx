import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateWatermark} from "../../../app/store/clipsSlice";
import { RootState } from "../../../app/store/store";
const useInitializeWatermark = () => {
  const dispatch = useDispatch();
  const projectSettings = useSelector((state: RootState) => state.settings);
  // console.log(projectSettings)
  const [watermark, setwatermark] = useState<{ url: string; condition: boolean } | null>(null);

 useEffect(() => {
    const fetchdata = async () => {
      try {

        const formdata = new FormData();
        formdata.append("access_token", projectSettings.access_token);
        const response = await fetch(`${projectSettings.api_url}/kdmvideoeditor/watermark`, {
          method: "POST",
          body: formdata,
        });
        const data = await response.json();

        setwatermark(data);
        // console.log(data)
      } catch {
        console.error("erroe data not fetched")
      } 
    }
    fetchdata()
  }, [projectSettings.access_token, projectSettings.api_url, ])



  useEffect(() => {
    if (watermark?.url && watermark?.condition !== undefined) {
      const defaultWatermark = {
        watermark_url: watermark.url,
        watermark_permission: watermark.condition,
      };

      dispatch(updateWatermark(defaultWatermark));
    }

  }, [dispatch, watermark?.condition, watermark?.url]); 

};

export default useInitializeWatermark;
