import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { User } from "../interfaces/types";
import { UserService } from "../services/userService";

const Home: NextPage = () => {
  const [userList, setUserList] = useState<Array<User>>([]);

  
  useEffect(() => {
    const userService = new UserService();
    userService.getAllUser().then((data) => setUserList(data));
    console.log(userService.getAllUser().then((data) =>console.log(data)));
  }, []);
  return (
    <>
      <div className="text-lg font-medium">Hola neztasdasdasd</div>
      {userList.map((user,ind) => {
        return <div key={ind} style={{color: "red"}}>{user.attributes.nombre}</div>;
      })}
    </>
  );
};

export default Home;
