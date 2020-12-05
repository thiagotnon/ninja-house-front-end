import { api } from "./api";

class OrderService {
  getAll() {
    return api.get("encomendas");
  }

  get(id) {
    return api.get(`encomendas/${id}`);
  }

  create(data) {
    return api.post("encomendas", data);
  }

  update(id, data) {
    return api.put(`encomendas/${id}`, data);
  }

  delete(id) {
    return api.delete(`encomendas/${id}`);
  }
}

export default new OrderService();
