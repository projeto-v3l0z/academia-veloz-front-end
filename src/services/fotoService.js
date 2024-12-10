import { fotoData } from '@/app/api/awards/fotoData';
import apiClient from './apiClient';

const useMock = false;

const fotoService = {
  getFotos: async () => {
    if (useMock) return { results: fotoData };

    try {
      const response = await apiClient.get('/api/imagem-evento/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar emblemas:', error);
      throw error;
    }
  },

  getFotosById: async (id) => {
    if (useMock) fotoData.find((foto) => foto.id === id);

    try {
      const response = await apiClient.get(`/api/imagem-evento/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar foto com id ${id}:`, error);
      throw error;
    }
  },

  patchFotos: async (id, data) => {
    if (useMock) {
      const index = fotoData.findIndex((foto) => foto.id === id);
      fotoData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/imagem-evento/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar foto com id ${id}:`, error);
      throw error;
    }
  },

  updateFotos: async (id, data) => {
    if (useMock) {
      const index = fotoData.findIndex((fotos) => fotos.id === id);
      fotoData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/imagem-evento/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar fotos com id ${id}:`, error);
      throw error;
    }
  },

  createFotos: async (data) => {
    if (useMock) {
      const newFoto = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      fotoData.push(newFoto);
      return newFoto;
    }

    try {
      const response = await apiClient.post('/api/imagem-evento/', data);
      console.log(response);

      return response.data;
    } catch (error) {
      console.error('Erro ao criar foto:', error);
      throw error;
    }
  },

  deleteFotos: async (id) => {
    if (useMock) {
      const index = fotoData.findIndex((foto) => foto.id === id);
      fotoData.splice(index, 1);
      return true;
    }

    try {
      const response = await apiClient.delete(`/api/imagem-evento/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar foto com id ${id}:`, error);
      throw error;
    }
  },
};

export default fotoService;
