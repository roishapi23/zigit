import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '../Helpers/Models/Auth'

const initialState: Auth = {
  token: sessionStorage.getItem("token"),
  personalDetails: sessionStorage.getItem("personalDetails") ? JSON.parse(sessionStorage.getItem("personalDetails") || "{}") : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action:PayloadAction<Auth>) => {
      const { token , personalDetails } = action.payload
      state.token = token;
      state.personalDetails = personalDetails
    },
    logout: (state) => {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("personalDetails")
      state.token = initialState.token;
      state.personalDetails = initialState.personalDetails
    },
  },
})

// Action creators are generated for each case reducer function
export const { login , logout } = authSlice.actions

export default authSlice.reducer