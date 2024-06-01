import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    eventList: [],
    bla: ''
  },
  reducers: {
    setEventsList: (state, action) => {
      const events = action.payload ? action.payload : []
        state.eventList = [...events]
        return state
    },
    addEventRate: (state, action) => {
      const { eventId, averageScore } = action.payload;

      [...state.eventList].find(event => event._id === eventId).rate = averageScore

      return state
          },
    },
})


export const { setEventsList, addEventRate, updateEventRate } = eventsSlice.actions

export default eventsSlice.reducer