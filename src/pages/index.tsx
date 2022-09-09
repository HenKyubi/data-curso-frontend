import type { NextPage } from "next";
import { useState } from "react";

//Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//Components
import UserCRUD from "../components/user-crud";

const Home: NextPage = () => {
  return (
    <div
      style={{ height: "95vh" }}
      className="flex justify-center items-center"
    >
      <UserCRUD />
    </div>
  );
};

export default Home;
