
import useFetchAPI from "../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEventsList } from "../store/features/eventsSlice";
import EventCard from "./EventCard";


const MainScreen = () => {
    const { getData } = useFetchAPI();
    const dispatch = useDispatch()
  
    const eventList = useSelector((state) => state.events.eventList)

    const [list, setList] = useState(eventList)

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
        <div className="bg-opacity-60 bg-blue-950 p-5 h-full">
    

         {list.length ? <div className="flex flex-col gap-5 h-full">{list.map((item) => 
         
         {
            return   <EventCard key={item._id} event={item} rate={0} />
         })}</div> : <div>LoadingEvents</div>}
        </div>
    );
}
export default MainScreen;