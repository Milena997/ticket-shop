const EventDetailsModal = ({ isOpen, onClose, event, rate }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center min-w-[500px] h-full">
      <div className="bg-white rounded-lg p-6 w-96 min-w-[700px]">
        <div className="flex justify-between pb-6">
          <div className="">
            <h1
              onClick={() => console.log(event)}
              className="text-2xl  text-center"
            >
              {event.eventName}{" "}
            </h1>

            <div className="flex items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 text-yellow-500`}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 6.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z" />
              </svg>
              {rate}
            </div>
          </div>
          <div
            className="cursor-pointer font-bold pt-1.5"
            onClick={() => {
              onClose();
            }}
          >
            {" "}
            X
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 pl-1">
            {" "}
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M304 192 A48 48 0 0 1 256 240 A48 48 0 0 1 208 192 A48 48 0 0 1 304 192 z"
              />
            </svg>{" "}
            {event.eventLocation}
          </div>

          {event.eventImage && (
            <div className="w-full flex justify-center py-6 ">
              <div
                style={{
                  background: `url('http://localhost:3001/api/v1/events/image/${event.eventImage}')`,
                }}
                className="w-80 h-72 shadow-md shadow-gray-500 bg-center"
              ></div>
            </div>
          )}
          <div className="p-2">{event.eventDescription}</div>
        </div>
      </div>
    </div>
  );
};
export default EventDetailsModal;
