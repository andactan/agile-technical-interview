import axios from "axios";

export default class ProvinceService {
  static URL = `http://localhost:8000/api/provinces`;

  static async getAll({ params = null } = {}) {
    return axios
      .get(this.URL, { params: params })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }
}
