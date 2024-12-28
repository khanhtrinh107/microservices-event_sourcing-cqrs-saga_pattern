import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserDetail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserDetail } = userSlice.actions;
export default userSlice.reducer;
