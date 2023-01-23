import api from "./api";
import authHeader from './auth.header';

class ApiService{
    post(path, data) {
        return api.post(`${path}`, data, { headers: authHeader() })
    }
    update(path, data) {
        return api.put(`${path}`, data,  { headers: authHeader() })
    }
    delete(path) {
        return api.delete(`${path}`, { headers: authHeader() })
    }
    get(path) {
        return api.get(`${path}`, { headers: authHeader() })
    }
}

export default new ApiService();