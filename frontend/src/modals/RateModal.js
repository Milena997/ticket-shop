import { useEffect, useState } from "react";
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addEventRate } from "../store/features/eventsSlice";

const Star = ({ filled, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-8 h-8 cursor-pointer ${
      filled ? "text-yellow-500" : "text-gray-300"
    }`}
    onClick={onClick}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 6.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z" />
  </svg>
);
const RateModal = ({
  isOpen,
  onClose,
  eventId,
  updateRateOnCard,
  previousRate,
}) => {
  const user = useSelector((state) => state.user.user);

  const { postData } = useFetchAPI();

  const [rating, setRating] = useState(0);
  const [averageRate, setAverageRate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setRating(previousRate);
  }, [isOpen]);
  const setRate = (star) => {
    const rate = {
      eventId: eventId,
      userId: user._id,
      reviewScore: star,
    };

    postData("rates", rate).then((res) => {
      setAverageRate(res.averageScore);
      dispatch(
        addEventRate({ eventId: eventId, averageScore: res.averageScore })
      );
    });
  };

  const updateRate = () => {
    updateRateOnCard(averageRate);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl mb-4 text-[#000]">Rate Us</h2>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              onClick={() => {
                setRating(star);
                setRate(star);
              }}
              previousRate={previousRate}
            />
          ))}
        </div>
        <button
          onClick={() => {
            onClose();
            updateRate();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default RateModal;
