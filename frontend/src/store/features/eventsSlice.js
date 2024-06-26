import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    eventList: [],
  },
  reducers: {
    setEventsList: (state, action) => {
      const events = action.payload ? action.payload : [];
      state.eventList = [...events];
      return state;
    },
    addEventRate: (state, action) => {
      const { eventId, averageScore } = action.payload;

      [...state.eventList].find((event) => event._id === eventId).rate =
        averageScore;

      return state;
    },
    addEvent: (state, action) => {
      const { event } = action.payload;

      state.eventList = [...state.eventList, event];
      console.log([...state.eventList]);

      return state;
    },
    deleteEvent: (state, action) => {
      const { eventId } = action.payload;
      state.eventList = [...state.eventList].filter(
        (event) => event._id !== eventId
      );
      return state;
    },
  },
});

export const { setEventsList, addEventRate, deleteEvent, addEvent } =
  eventsSlice.actions;

export default eventsSlice.reducer;
