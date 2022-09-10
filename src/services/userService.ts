import axios from "axios";
import { User } from "../interfaces/types";
export class UserService {
  baseURL: string = "http://localhost:1337/api/usuarios";
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
