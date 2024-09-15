import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string | null;
  };
  isAuth: boolean;
}

const initialState: UserState = {
  user: {
    email: "",
    username: "",
    bio: "",
    image: null,
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    logIn: (state) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
});

export const { setUserData, logOut, logIn } = userSlice.actions;


export default userSlice.reducer;
