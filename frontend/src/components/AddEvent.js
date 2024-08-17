import { useEffect, useState } from "react";
import RateModal from "../modals/RateModal";
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addEventRate } from "../store/features/eventsSlice";
import DeleteEventModal from "../modals/DeleteEventModal";

const AddEvent = ({ onClick }) => {
  return (
    <div className="flex justify-end pb-10">
      <button
        onClick={onClick}
        className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        + Add Event
      </button>
    </div>
  );
};
export default AddEvent;
