
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEventsList } from "../store/features/eventsSlice";
import EventCard from "./EventCard";
import AddEvent from "./AddEvent";
import AddEventModal from "../modals/AddEventModal";


const MainScreen = () => {
    const { getData } = useFetchAPI();
    const dispatch = useDispatch()

  
    const eventList = useSelector((state) => state.events.eventList)

    const [list, setList] = useState(eventList)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const getAllEvens = () => {
        getData(`events`).then((res) => {
            dispatch(setEventsList(res));

            setList(res)
        });

    }

useEffect(() => {
    getAllEvens()
},[])

    return (
        <div className="bg-opacity-60  p-5 h-full">
            <AddEvent onClick={() => setIsAddModalOpen(true)}/>
    

         {eventList.length ? <div className="flex flex-col gap-5 h-full pb-5">{eventList.map((item) => 
         
         {
            return   <EventCard key={item._id} event={item} rate={0} />
         })}</div> : <div>LoadingEvents</div>}

         <AddEventModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
}
export default MainScreen;