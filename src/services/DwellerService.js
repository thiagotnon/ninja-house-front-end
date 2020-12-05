import { api } from "./api";

class DwellerService {
  getAll() {
    return api.get("moradores");
  }

  get(id) {
    return api.get(`moradores/${id}`);
  }

  create(data) {
    return api.post("moradores", data);
  }

  update(id, data) {
    return api.put(`moradores/${id}`, data);
  }

  delete(id) {
    return api.delete(`moradores/${id}`);
  }
}

export default new DwellerService();
