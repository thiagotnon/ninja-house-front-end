import { api } from "./api";

class UnitService {
  getAll() {
    return api.get("unidades");
  }

  get(id) {
    return api.get(`unidades/${id}`);
  }

  getDwellers(id) {
    return api.get(`unidade/${id}/moradores`);
  }

  create(data) {
    return api.post("unidades", data);
  }

  update(id, data) {
    return api.put(`unidades/${id}`, data);
  }

  delete(id) {
    return api.delete(`unidades/${id}`);
  }
}

export default new UnitService();
