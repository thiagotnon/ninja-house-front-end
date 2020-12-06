import { api } from "./api";

class MessageService {
  getAll() {
    return api.get("mensagens");
  }

  get(id) {
    return api.get(`mensagens/${id}`);
  }

  create(data) {
    return api.post("mensagens", data);
  }

  update(id, data) {
    return api.put(`mensagens/${id}`, data);
  }

  delete(id) {
    return api.delete(`mensagens/${id}`);
  }
}

export default new MessageService();
