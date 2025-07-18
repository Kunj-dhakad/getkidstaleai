"use client";
import { configureStore } from '@reduxjs/toolkit';
import slicesReducer from './clipsSlice'; 
import settingsReducer from './project_settingsSlice '; 
import editorReducer from './editorSetting';

const store = configureStore({
  reducer: {
    slices: slicesReducer,
    settings: settingsReducer,
    editorTool: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
