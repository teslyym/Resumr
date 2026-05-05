import api from "./api";

export const cvService = {
  list: async () => {
    const { data } = await api.get("/cv");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/cv/${id}`);
    return data;
  },

  create: async (cv = {}) => {
    const { data } = await api.post("/cv", cv);
    return data;
  },

  update: async (id, updates) => {
    const { data } = await api.put(`/cv/${id}`, updates);
    return data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/cv/${id}`);
    return data;
  },
};
