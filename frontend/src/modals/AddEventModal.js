import React, { useState } from "react";
import { TextField, Stack } from "@mui/material";
import DragAndDropComponent from "../components/DragAndDropComponent";
import useFetchAPI from "../services/fetchApi";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/features/eventsSlice";

const AddEventModal = ({ isOpen, onClose }) => {
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventLocation: "",
    eventImage: "",
  });
  const [files, setFiles] = useState([]);
  const { postDataFetchApi } = useFetchAPI();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    postDataFetchApi("events", { ...newEvent, file: files[0] }).then((res) => {
      dispatch(addEvent({ event: res }));
    });
    setNewEvent({
      eventName: "",
      eventDescription: "",
      eventDate: "",
      eventLocation: "",
      eventImage: "",
    });
    onClose();
  };
  const handlEventName = (e) => {
    const name = e.target.value;
    setNewEvent({ ...newEvent, eventName: name });
  };
  const handlEventDescription = (e) => {
    const description = "" + e.target.value;
    setNewEvent({ ...newEvent, eventDescription: description });
  };

  const handlEventLocation = (e) => {
    const location = "" + e.target.value;
    setNewEvent({ ...newEvent, eventLocation: location });
  };
  const handlEventDate = (e) => {
    const date = "" + e.target.value;
    setNewEvent({ ...newEvent, eventDate: date });
  };
  if (!isOpen) return null;
  return (
    <React.Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center min-w-[500px] z-40">
        <div className="bg-white rounded-lg p-6 w-96 min-w-[700px]">
          <div className="flex justify-between pb-6">
            <h1 className="text-2xl  text-center">Create new event </h1>
            <div
              className="cursor-pointer font-bold pt-1.5"
              onClick={() => {
                onClose();
                setNewEvent({
                  eventName: "",
                  eventDescription: "",
                  eventDate: "",
                  eventLocation: "",
                  eventImage: "",
                });
              }}
            >
              {" "}
              X
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Event's Name"
                onChange={(e) => handlEventName(e)}
                value={newEvent.eventName}
                fullWidth
                required
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Event's Description"
                multiline
                onChange={(e) => handlEventDescription(e)}
                value={newEvent.eventDescription}
                fullWidth
                maxRows={4}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Presenting date"
                onChange={(e) => handlEventDate(e)}
                value={newEvent.eventDate}
                fullWidth
                required
                sx={{ mb: 4 }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toLocaleDateString("en-CA"),
                }}
              />

              {/* <DatePicker /> */}
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Event's location"
                onChange={(e) => handlEventLocation(e)}
                value={newEvent.eventLocation}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            </Stack>

            <DragAndDropComponent onFilesSelected={setFiles} height="400px" />
            <div className="pt-6">
              <button
                type="submit"
                value="Submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddEventModal;
