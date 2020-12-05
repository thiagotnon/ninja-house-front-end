import { api, apiImage } from "./api";

class LeisureSpaceService {
  getAll() {
    return api.get("espacos-de-lazer");
  }

  get(id) {
    return api.get(`espacos-de-lazer/${id}`);
  }

  create(data) {
    return api.post("espacos-de-lazer", data);
  }
  createImg(id, data) {
    return apiImage.post(`espacos-de-lazer/${id}/imagens`, data);
  }

  update(id, data) {
    return api.put(`espacos-de-lazer/${id}`, data);
  }

  delete(id) {
    return api.delete(`espacos-de-lazer/${id}`);
  }
}

export default new LeisureSpaceService();
