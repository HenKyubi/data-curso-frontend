import type { NextPage } from "next";

//Components
import UserCRUD from "../components/user-crud";
import Login from "../components/login.jsx";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [login, setLogin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLogin(false);
    }, 3000);
  }, []);
  return (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center"
    >
      {login && <Login />}
      {!login && <UserCRUD />}
    </div>
  );
};

export default Home;
