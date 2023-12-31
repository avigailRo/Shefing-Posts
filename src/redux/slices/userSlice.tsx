import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUser from '../../model/IUser'

interface IUserState {
    user: IUser|null,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

const initialState: IUserState = {
    user:null,
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

export const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer;