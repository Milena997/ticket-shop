import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        name: '',
        lastName: '',
        dateOfBirth: '',
        location: '',
        userId: ''
    }
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer