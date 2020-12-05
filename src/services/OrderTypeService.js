import { api } from "./api";

class OrderTypeService {
  getAll() {
    return api.get("encomendas/tipo-de-encomenda");
  }

  get(id) {
    return api.get(`encomendas/tipo-de-encomenda/${id}`);
  }

  create(data) {
    return api.post("encomendas/tipo-de-encomenda", data);
  }

  update(id, data) {
    return api.put(`encomendas/tipo-de-encomenda/${id}`, data);
  }

  delete(id) {
    return api.delete(`encomendas/tipo-de-encomenda/${id}`);
  }
}

export default new OrderTypeService();
