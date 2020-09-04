import { createSlice } from '@reduxjs/toolkit'

interface IAuthState {
    token: string | null
}

const initialState: IAuthState = {
    token: 'test',
}

const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset(state) {
            state.token = null
        },
    },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
