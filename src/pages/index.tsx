import type { NextPage } from "next";

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
