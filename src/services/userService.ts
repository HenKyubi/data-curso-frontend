import axios from "axios";
import { ResponseGetAllUsers } from "../interfaces/response-get-all-users";
import { User } from "../interfaces/types";
export class UserService {
  // baseURL: string = "https://cohan-backend.herokuapp.com/api/";
  baseURL: string =
    "postgres://ntlgldhciwcgvc:f314444384b8d2ac8338570f1c72a26f41921841582218183e04f0c23ff462ff@ec2-44-207-253-50.compute-1.amazonaws.com:5432/df07insph786lt/api/usuarios";
  async getAllUser(): Promise<Array<User>> {
    return await axios.get(this.baseURL).then((response) => response.data.data);
  }

  async saveUser(user: any): Promise<any> {
    return await axios
      .post(this.baseURL, { data: user })
      .then((response) => response.data);
  }

  async deleteUser(id: string): Promise<void> {
    return await axios
      .delete(`${this.baseURL}/${id}`)
      .then((response) => response.data);
  }

  async updateUser(id: number, user: any): Promise<any> {
    return await axios
      .put(`${this.baseURL}/${id}`, { data: user })
      .then((response) => response.data);
  }
}
