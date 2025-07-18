import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ProjecSettingtData {
  action: string;
  id: string;
  project_name:string;
  access_token: string;
  project_id: string;
  api_url: string;
}

const initialSettingsState: ProjecSettingtData = {
  action: "",
  id: "",
  access_token: "",
  project_id: "",
  project_name:"",
  api_url: "",
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    updateProjectSettings: (state, action: PayloadAction<ProjecSettingtData>) => {
      const { action: actionType, id, access_token, project_id,project_name, api_url } = action.payload;
      state.id = id;
      state.action = actionType;
      state.project_id = project_id;
      state.project_name = project_name;
      state.api_url = api_url;
      state.access_token = access_token;
    },
  },
});

export const { updateProjectSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
