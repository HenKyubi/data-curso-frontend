import axios from "axios";
import { ResponseGetAllUsers } from "../interfaces/response-get-all-users";
import { User } from "../interfaces/types";
export class UserService {
  // baseURL: string = "https://cohan-backend.herokuapp.com/api/";
  baseURL: string = "http://localhost:1337/api/usuarios";
  async getAllUser(): Promise<Array<User>> {
    return await axios.get(this.baseURL).then((response) => response.data.data);
  }

  async saveUser(user: any): Promise<any> {
    return await axios
      .post(this.baseURL, user)
      .then((response) => response.data);
  }

  async deleteUser(id: string): Promise<void> {
    return await axios.delete(this.baseURL).then((response) => response.data);
  }
}
