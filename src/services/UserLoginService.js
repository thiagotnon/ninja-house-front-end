import { unMask } from "remask";
import { api } from "./api";

class UserLoginService {
  login(data) {
    return api.post("usuarios/token", data);
  }
  create(data) {
    data = { ...data, cpf: unMask(data.cpf), phone: unMask(data.phone) };
    return api.post("usuarios", data);
  }
}

export default new UserLoginService();
