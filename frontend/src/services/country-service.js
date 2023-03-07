import axios from "axios";

export default class CountryService {
  static URL = `http://localhost:8000/api/countries`;

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

  static async get(id) {
    return axios
      .get(`${this.URL}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  static async delete(id) {
    return axios
      .delete(`${this.URL}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }

  static async patch({ id, params = null } = {}) {
    return axios
      .patch(`${this.URL}/${id}`, { ...params })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error.response);
      });
  }
}
