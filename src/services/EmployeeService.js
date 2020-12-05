import { api } from "./api";

class EmployeeService {
  getAll() {
    return api.get("funcionarios");
  }

  get(id) {
    return api.get(`funcionarios/${id}`);
  }

  create(data) {
    return api.post("funcionarios", data);
  }

  update(id, data) {
    return api.put(`funcionarios/${id}`, data);
  }

  delete(id) {
    return api.delete(`funcionarios/${id}`);
  }
}

export default new EmployeeService();
