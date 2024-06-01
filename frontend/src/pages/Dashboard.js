import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchAPI from "../services/fetchApi";
import { setUser } from "../store/features/userSlice";
import Header from "../components/Header";
import MainScreen from "../components/MainScreen";

const Dashboard = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.account.account)

    const { getData } = useFetchAPI();
    const dispatch = useDispatch()
    useEffect(() => {
        if(!(localStorage.hasOwnProperty('token') || localStorage.hasOwnProperty('refreshToken'))) {
            navigate('/login')
        }

        if(localStorage.hasOwnProperty('token')) {

            getData(`users/${account.userId}`).then((res) => {
                dispatch(setUser(res));
            });
        }

    }, [localStorage.hasOwnProperty('token')])

    return (
        <div className="h-full">

           <Header />
           <MainScreen />

           
        </div>
    );
}
export default Dashboard;