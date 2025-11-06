import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "@customTypes";

interface UserState {
    token: Nullable<string>
}

const initialState: UserState = {
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.token = null;
        }
    }
})

export const { setToken, logOut } = userSlice.actions;
export default userSlice.reducer;