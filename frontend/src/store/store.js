import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './features/accountSlice'
import userReducer from './features/userSlice'
import eventsReducer from './features/eventsSlice'



export default configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    events: eventsReducer
    },
})