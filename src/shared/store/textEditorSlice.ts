import { createSlice } from '@reduxjs/toolkit';
interface TextEditorText {
  text: string;
  queryValue: string;
}

const initialState: TextEditorText = {
  text: '',
  queryValue: '',
};

const textEditorSlice = createSlice({
  name: 'textEditorSlice',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
    setQueryValue(state, action) {
      state.queryValue = action.payload;
    },
  },
});

export const { setText, setQueryValue } = textEditorSlice.actions;
export default textEditorSlice.reducer;
