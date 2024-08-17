import "./App.css";
import useFetchAPI from "./services/fetchApi";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const { postData } = useFetchAPI();

  const refreshToken = () => {
    setInterval(() => {
      if (localStorage.getItem("refreshToken") !== null) {
        const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

        postData("token", { refreshToken: refreshToken }).then((res) => {
          console.log(res);
          if (res) {
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(res.refreshToken)
            );
            localStorage.setItem("2", JSON.stringify(res.refreshToken));

            localStorage.setItem("token", JSON.stringify(res.token));
          }
        });
      }
    }, 1 * 59 * 1000);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
