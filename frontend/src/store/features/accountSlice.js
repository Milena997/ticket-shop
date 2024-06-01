import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: {
        email: '',
        username: '',
        userId: localStorage.hasOwnProperty('userId') ? JSON.parse(localStorage.getItem('userId')) : '',
    }
  },
  reducers: {
    setUsername: (state, action) => {
      state.account.username = action.payload
    },
    setEmail: (state, action) => {
        state.account.email = action.payload
    },
    setAccount: (state, action) => {
        state.account = action.payload
    }
  },
})


export const { setUsername, setEmail, setAccount } = accountSlice.actions

export default accountSlice.reducer