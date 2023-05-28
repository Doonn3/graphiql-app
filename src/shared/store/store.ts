import { configureStore } from '@reduxjs/toolkit';
import textEditorSlice from '@shared/store/textEditorSlice';

export const store = configureStore({
  reducer: {
    ide: textEditorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
