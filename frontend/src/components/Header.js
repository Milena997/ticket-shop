
import { useSelector } from "react-redux";
import Logout from "./Logout";

const Header = () => {
    const user = useSelector((state) => state.user.user)


    return (
        <div className="bg-blue-950 flex justify-between  p-5 items-center  border-b-2">
            <div className="flex flex-col ">

            <div className="flex gap-1 font-bold text-2xl text-white">
                <div>{user?.name}</div>
                <div>{user?.lastName}</div>
            </div>
            <div className=" text-white">{user?.location}</div>
            </div>
            <Logout className=""/>
        </div>
    );
}
export default Header;