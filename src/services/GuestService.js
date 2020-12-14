import { unMask } from "remask";
import { api } from "./api";

class GuestService {
  getAll() {
    return api.get("hospedes");
  }

  get(id) {
    return api.get(`hospedes/${id}`);
  }

  create(data) {
    data = { ...data, cpf: unMask(data.cpf) };

    return api.post("hospedes", data);
  }

  update(id, data) {
    return api.put(`hospedes/${id}`, data);
  }

  delete(id) {
    return api.delete(`hospedes/${id}`);
  }
}

export default new GuestService();
