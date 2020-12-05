import { api } from "./api";

class MessageService {
  getAll() {
    return api.get("avisos");
  }

  get(id) {
    return api.get(`avisos/${id}`);
  }

  create(data) {
    return api.post("avisos", data);
  }

  update(id, data) {
    return api.put(`avisos/${id}`, data);
  }

  delete(id) {
    return api.delete(`avisos/${id}`);
  }
}

export default new MessageService();
