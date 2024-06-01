import { useNavigate } from "react-router-dom";
import useFetchAPI from "../services/fetchApi";

const Logout = () => {
    const { postData } = useFetchAPI();
    const navigate = useNavigate()
    const handleLogout = () => {
        try {

            const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
                postData('logout', {refreshToken: refreshToken}).then(() => {
                    localStorage.clear()
                    navigate('/login')
                });
                       
    
        } catch (error) {
            console.log(error)
    
        }
    }

    return (
        <div>
            <button className="text-white bg-[#232323] px-16 py-2 rounded hover:bg-black hover:!text-white" onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default Logout;