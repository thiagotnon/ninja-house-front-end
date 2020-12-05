import { api } from "./api";
import { unMask } from "remask";

class ReservationGuestService {
  getAll() {
    return api.get("reservas/convidados");
  }

  get(id) {
    return api.get(`reservas/convidados/${id}`);
  }

  create(data) {
    data = { ...data, cpf: unMask(data.cpf) };
    return api.post("reservas/convidados", data);
  }

  update(id, data) {
    return api.put(`reservas/convidados/${id}`, data);
  }

  delete(id) {
    return api.delete(`reservas/convidados/${id}`);
  }
}

export default new ReservationGuestService();
