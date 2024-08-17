import { useNavigate } from "react-router-dom";
import useFetchAPI from "../services/fetchApi";

const Logout = ({ userType }) => {
  const { postData } = useFetchAPI();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!userType) {
      navigate("/login");
      return;
    }
    try {
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      postData("logout", { refreshToken: refreshToken }).then(() => {
        localStorage.clear();
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="text-white bg-[#232323] px-14 py-3 rounded hover:bg-black hover:!text-white"
        onClick={handleLogout}
      >
        {!userType ? "Login" : "Logout"}
      </button>
    </div>
  );
};
export default Logout;
