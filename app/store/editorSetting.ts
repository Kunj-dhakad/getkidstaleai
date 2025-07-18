import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type RenderStatus = "normal" | "rendering" | "done";
interface editorSettingData { // Fixed typo
    Activeid: string;
    saveDraftId: string;
    SaveDraftname: string;
    MiddleSectionVisible: boolean;
    toolbarview: | ""
    | "menu"
    | "text"
    | "texteditor"
    | "image"
    | "image_edit_tool"
    | "video"
    | "video_edit_tool"
    | "emoji"
    | "emoji_edit_tool"
    | "audio"
    | "audio_edit_tool"
    | "upload"
    | "template"
    | "render_video_list"
    | "heygen_video_list"
    | "SaveDraft"
    | "Library"
    | "main_container_bg"
    |"TextToSpeech"
    | "TextToImage";
    bgRemovingMap: { [videoId: string]: boolean };
    clipsplitRequested: boolean;
    RenderStatus: RenderStatus;


}

const initialSettingsState: editorSettingData = {
    Activeid: "",
    saveDraftId: "",
    SaveDraftname: "",
    MiddleSectionVisible: true,
    toolbarview: "heygen_video_list",
    bgRemovingMap: {}, // ✅ new
    clipsplitRequested: false,
    RenderStatus: "normal",

};

const editorTool = createSlice({
    name: 'editorTool',
    initialState: initialSettingsState,
    reducers: {
        requestSplit(state) {
            state.clipsplitRequested = true;
        },
        resetSplitRequest(state) {
            state.clipsplitRequested = false;
        },
        setActiveid: (state, action: PayloadAction<string>) => {
            state.Activeid = action.payload;
            // console.log(action.payload)
        },
        setsaveDraftId: (state, action: PayloadAction<string>) => {
            state.saveDraftId = action.payload;
            // console.log(action.payload)
        },

        setSaveDraftname: (state, action: PayloadAction<string>) => {
            state.SaveDraftname = action.payload;
            // console.log(action.payload)
        },

        settoolbarview: (state, action: PayloadAction<string>) => {
            if (["", "menu", "text", "texteditor", "image", "image_edit_tool", "video", "video_edit_tool", "emoji", "emoji_edit_tool", "audio", "audio_edit_tool", "upload", "template", "render_video_list", "heygen_video_list", "SaveDraft", "Library", "main_container_bg","TextToSpeech","TextToImage"].includes(action.payload)) {
                state.toolbarview = action.payload as typeof state.toolbarview;
            } else {
                console.error("Invalid toolbarview value:", action.payload);
            }
            // console.log(action.payload)
        },



        MiddleSectionVisibleaction: (state, action: PayloadAction<boolean>) => {
            state.MiddleSectionVisible = action.payload;
            // console.log(action.payload)
        },


        setBgRemoving: (state, action: PayloadAction<{ id: string; value: boolean }>) => {
            state.bgRemovingMap[action.payload.id] = action.payload.value;
        },
        setRenderStatus(state, action: PayloadAction<RenderStatus>) {
            state.RenderStatus = action.payload;
            console.log("test230", action.payload)
        },
        resetRenderStatus(state) {
            state.RenderStatus = "normal";
        },

    },
});

export const { setRenderStatus, resetRenderStatus, setActiveid, setBgRemoving, requestSplit, resetSplitRequest, setsaveDraftId, setSaveDraftname, MiddleSectionVisibleaction, settoolbarview, } = editorTool.actions;
export default editorTool.reducer;
