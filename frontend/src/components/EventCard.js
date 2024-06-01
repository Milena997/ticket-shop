import { useEffect, useState } from "react";
import RateModal from "../modals/RateModal";
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addEventRate } from "../store/features/eventsSlice";


const EventCard = (event) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getData } = useFetchAPI();
    const [rate, setRate] = useState(0)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const [previousRate, setPreviousRate] = useState(0)



    useEffect(() => {
            getData(`rates/${event.event._id}`).then((res) => {
                if(res.averageScore) {
                    dispatch(addEventRate({eventId: event.event._id, averageScore: res.averageScore }))
                    setRate(res.averageScore)
                }
            })
    
        },[])
const openModal = () => {
    getData(`rates/rate?userId=${user._id}&eventId=${event.event._id}`).then((res) => {
            if(res) {
                setPreviousRate(res.reviewScore)
                
            }
            setIsModalOpen(true)
    
          })

}
        const updateRateOnCard = (newRate) => {
            if(newRate !== 0) {
                setRate(newRate)
            }
        }
    return ( 
        <div className="flex px-[150px] h-full">

        <div className=" border bg-white shadow-md shadow-gray-500 rounded-md  m-[0 auto] w-full px-5 py-3  flex flex-col  ">
            <div className="flex-auto">

               <div className="flex justify-between">
                <div className="font-bold text-lg">  {event.event.eventName}</div>   
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3 6h18v2H3V6zm3 3h12v13H6V9zm2 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zM5 4h14v2H5V4z"/>
                </svg>
               
                </div> 
                <div className="font-400 text-sm">  {event.event.eventDate}, {event.event.eventLocation}</div>
             </div>
            <div className="flex justify-between">

                    <div className="font-400 text-xs"> {event.event.eventDescription} </div>
                    <div className="flex gap-2">{rate.toFixed(2)}
                        <svg  onClick={() => openModal()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${rate === 0 ? 'text-gray-400' : 'text-yellow-500'} cursor-pointer`}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 6.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z"/>
                        </svg>
                        
                    </div>
                   
      <RateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventId={event.event._id} updateRateOnCard={updateRateOnCard} previousRate={previousRate} />
                   

            </div>
        </div>
        </div>
    );
}
export default EventCard;