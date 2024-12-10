import { instituteData } from '@/app/api/awards/instituteData';
import apiClient from './apiClient';

const useMock = false;

const instituteService = {
  getInstitutions: async () => {
    if (useMock) {
      return {
        results: instituteData,
      };
    }

    try {
      const response = await apiClient.get('/api/instituicoes/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar instituições:', error);
      throw error;
    }
  },

  getInstitutionById: async (id) => {
    if (useMock) {
      return instituteData.find((institution) => institution.id === id);
    }

    try {
      const response = await apiClient.get(`/api/instituicoes/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar instituição com id ${id}:`, error);
      throw error;
    }
  },

  getInstitutionByName: async (name) => {
    if (useMock) {
      return instituteData.find((institution) => institution.name === name);
    }

    try {
      const response = await apiClient.get(`/api/instituicoes/?name=${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar instituição com id ${name}:`, error);
      throw error;
    }
  },

  updateInstitution: async (id, data) => {
    if (useMock) {
      const index = instituteData.findIndex((institution) => institution.id === id);
      instituteData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/instituicoes/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar instituição com id ${id}:`, error);
      throw error;
    }
  },

  createInstitution: async (data) => {
    if (useMock) {
      const newInstitution = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      instituteData.push(newInstitution);
      return newInstitution;
    }

    try {
      const response = await apiClient.post('/api/instituicoes/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar instituição:', error);
      throw error;
    }
  },

  deleteInstitution: async (id) => {
    if (useMock) {
      const index = instituteData.findIndex((institution) => institution.id === id);
      instituteData.splice(index, 1);
      return true;
    }

    try {
      const response = await apiClient.delete(`/api/instituicoes/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar instituição com id ${id}:`, error);
      throw error;
    }
  },
};

export default instituteService;
