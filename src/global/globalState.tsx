import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {} || null
}

const globalState = createSlice({
    name: "state",
    initialState,
    reducers: {
        mainUser: (state: any, { payload }) => {
            state.user = payload
        },
        logOut: (state: any) => {
            state.user = null
        }
    }
});

export const { logOut, mainUser } = globalState.actions

export default globalState.reducer