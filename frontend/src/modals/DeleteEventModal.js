import { useDispatch } from "react-redux";
import useFetchAPI from "../services/fetchApi";
import { deleteEvent } from "../store/features/eventsSlice";

const DeleteEventModal = ({ isOpen, onClose, eventId, eventName }) => {
  const { deleteData } = useFetchAPI();
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    //implemen logic for deleting event
    deleteData(`events/${eventId}`).then((res) => {
      dispatch(deleteEvent({ eventId: eventId }));
    });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h1 className="text-2xl  text-center">
          Are you sure you want to delete{" "}
        </h1>
        <h1 className="text-2xl mb-4 text-center text-[#D10000]">
          {eventName}?{" "}
        </h1>

        <div className="flex justify-between">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Close
          </button>
          <button
            onClick={() => {
              handleDeleteEvent();
            }}
            className="px-4 py-2 bg-[#D10000] text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteEventModal;
