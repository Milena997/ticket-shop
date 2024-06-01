import { useEffect, useState } from "react";
import useFetchAPI from "../services/fetchApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccount } from "../store/features/accountSlice";

const Login = () => {
    const dispatch = useDispatch()

const [emailValue, setemailValue] = useState('');
const [passwordValue, setPasswordValue] = useState('');
const { postData } = useFetchAPI();
const navigate = useNavigate()

const handleEmailChange = (e) => {
    setemailValue(e.target.value.trim())
} 
const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value.trim())
} 
const handleLogin =  async() => {
    try {

        const user = {
            email: emailValue,
            password: passwordValue
        }

            postData('login', user).then((res) => {
                console.log('res:',res);
                const token = JSON.stringify(res.token)
                const userId = JSON.stringify(res.user._id);

                localStorage.setItem('userId',userId )
                console.log('token:',token);
                localStorage.setItem('token',token )
                const refreshToken = JSON.stringify(res.refreshToken)
                localStorage.setItem('refreshToken',refreshToken )
                dispatch(setAccount({
                    username: res.user.username,
                    email: res.user.email,
                    userId: res.user._id,
                }));


                    navigate('/')

            });
                   

    } catch (error) {
        console.log(error)

    }

}

useEffect(() => {

    if(localStorage.hasOwnProperty('token') || localStorage.hasOwnProperty('refreshToken')) {
        navigate('/')
    }
})
    return (
        <div className="flex items-center justify-center h-full flex-col gap-10 bg-[#232323]">
            <div className="flex flex-col gap-4 ">

                <div className="text-white text-2xl font-bold">Email:</div>
                <input className="min-w-80 py-2 rounded  px-4  text-[#ccc] box-border text-base outline-none border-t-0 border-l-0 border-r-0 border-b-0 " name="firstName"  value={emailValue}  onChange={(e) =>handleEmailChange(e)}/>
            </div>
            

            <div className=" flex flex-col gap-4">

                <div className="text-white text-2xl font-bold">Password:</div>
                <input name="password" type="password" className="min-w-80 py-2 px-4 rounded   text-[#ccc] box-border text-base outline-none border-t-0 border-l-0 border-r-0 border-b-0 shadow-[]"  value={passwordValue}  onChange={(e) =>handlePasswordChange(e)}/>
            </div>
            <button className="text-white px-16 py-2 rounded hover:bg-white hover:!text-black" onClick={handleLogin}>Login</button>

        </div>
    );
}
export default Login;