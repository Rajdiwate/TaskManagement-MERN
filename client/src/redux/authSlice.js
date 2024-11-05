import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk('authSlice/getUser', async (_, thunkApi) => {
    const response = await axios.get('http://localhost:8000/api/user/me' , {withCredentials : true})
    const user = response.data.user
    return  user 
})



const initialState  = {
  isAuthenticated: false,
  user: {
    _id: null,
    name: null,
    email: null,
  },
  loading: true,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.user = {
        _id: null,
        name : null,
        email: null,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        console.log("pending")
        state.loading = true
        state.isAuthenticated = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
          console.log('payload available', action.payload)
          state.isAuthenticated = true
          state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("error occured" , action.error)
        state.loading = false
        state.isAuthenticated = false
        state.error = action.error.message || 'Failed to fetch user'
        state.user = initialState.user
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer