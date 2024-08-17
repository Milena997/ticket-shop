import { useEffect, useState } from "react";
import RateModal from "../modals/RateModal";
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addEventRate } from "../store/features/eventsSlice";
import DeleteEventModal from "../modals/DeleteEventModal";
import "./EventCard.css";
import EventDetailsModal from "../modals/EventDetailsModal";

const EventCard = (event) => {
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEventDetaisModalOpen, setIsEventDetailsModalOpen] = useState(false);

  const { getData } = useFetchAPI();
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [previousRate, setPreviousRate] = useState(0);

  const background =
    event.event.eventImage !== ""
      ? `url('http://localhost:3001/api/v1/events/image/${event.event.eventImage}')`
      : "#fff";
  useEffect(() => {
    getData(`rates/${event.event._id}`).then((res) => {
      if (res.averageScore) {
        dispatch(
          addEventRate({
            eventId: event.event._id,
            averageScore: res.averageScore,
          })
        );
        setRate(res.averageScore);
      }
    });
  }, []);
  const openRateModal = () => {
    getData(`rates/rate?userId=${user._id}&eventId=${event.event._id}`).then(
      (res) => {
        if (res) {
          setPreviousRate(res.reviewScore);
        }
        setIsRateModalOpen(true);
      }
    );
  };
  const updateRateOnCard = (newRate) => {
    if (newRate !== 0) {
      setRate(newRate);
    }
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  return (
    <div
      className="relative overflow-hidden rounded-md !bg-contain !bg-center h-[400px] w-[500px] !bg-no-repeat p-12 text-center border shadow-md  shadow-gray-500 z-[5] "
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="absolute bottom-0 left-0 !bg-contain  !bg-no-repeat !bg-center right-0 top-0 h-full w-full overflow-hidden bg-fixed "
        style={{
          background: background,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex flex-col w-full h-96 px-5 py-4  m-[0 auto] text-start">
          <div className="flex-auto ">
            <div className="flex justify-between">
              <div
                onClick={() => setIsEventDetailsModalOpen(true)}
                className="cursor-pointer font-bold text-2xl text-[#fff] hover:text-blue-400"
              >
                {" "}
                {event.event.eventName}
              </div>
              <svg
                onClick={() => openDeleteModal()}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 100 100"
              >
                <path
                  fill="#f37e98"
                  d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
                ></path>
                <path
                  fill="#f15b6c"
                  d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
                ></path>
                <path
                  fill="#1f212b"
                  d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
                ></path>
                <path
                  fill="#1f212b"
                  d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
                ></path>
                <path
                  fill="#1f212b"
                  d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
                ></path>
                <path
                  fill="#1f212b"
                  d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
                ></path>
              </svg>
            </div>
            <div className="font-400 text-sm text-[#fff]">
              {" "}
              {event.event.eventDate}, {event.event.eventLocation}
            </div>
          </div>
          <div className="flex flex-1 justify-between items-end ">
            <div
              className="line-clamp-3 font-400 text-sm overflow-hidden text-ellipsis max-h-28  flex-grow pr-5 cursor-pointer text-[#fff]"
              title={event.event.eventDescription}
            >
              {" "}
              {event.event.eventDescription}{" "}
            </div>
            <div className="flex gap-2 font-medium text-[#fff]">
              {rate.toFixed(2)}
              <svg
                onClick={() => openRateModal()}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 ${
                  rate === 0 ? "text-gray-400" : "text-yellow-500"
                } cursor-pointer`}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 6.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </div>

            <RateModal
              isOpen={isRateModalOpen}
              onClose={() => setIsRateModalOpen(false)}
              eventId={event.event._id}
              eventName={event.event.eventName}
              updateRateOnCard={updateRateOnCard}
              previousRate={previousRate}
            />
            <DeleteEventModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              eventId={event.event._id}
              eventName={event.event.eventName}
            />
            <EventDetailsModal
              isOpen={isEventDetaisModalOpen}
              onClose={() => setIsEventDetailsModalOpen(false)}
              event={event.event}
              rate={rate.toFixed(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
