import { api } from "./api";

class ReservationService {
  getAll() {
    return api.get("reservas");
  }

  get(id) {
    return api.get(`reservas/${id}`);
  }

  create(data) {
    return api.post("reservas", data);
  }

  update(id, data) {
    return api.put(`reservas/${id}`, data);
  }

  delete(id) {
    return api.delete(`reservas/${id}`);
  }
}

export default new ReservationService();
