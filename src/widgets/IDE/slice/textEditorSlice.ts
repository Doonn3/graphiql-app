import { createSlice } from '@reduxjs/toolkit';
interface TextEditorText {
  text: string;
}

const initialState: TextEditorText = {
  text: '',
};

const textEditorSlice = createSlice({
  name: 'textEditorSlice',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
  },
});

export const { setText } = textEditorSlice.actions;
export default textEditorSlice.reducer;
