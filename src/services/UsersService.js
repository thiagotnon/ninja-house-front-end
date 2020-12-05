import { api } from "./api";
import { unMask } from "remask";

class UsersService {
  getAll() {
    return api.get("usuarios");
  }

  get(id) {
    return api.get(`usuarios/${id}`);
  }

  create(data) {
    data = { ...data, cpf: unMask(data.cpf), phone: unMask(data.phone) };
    return api.post("usuarios", data);
  }

  update(id, data) {
    data = { ...data, cpf: unMask(data.cpf) };
    return api.put(`usuarios/${id}`, data);
  }

  delete(id) {
    return api.delete(`usuarios/${id}`);
  }
}

export default new UsersService();
