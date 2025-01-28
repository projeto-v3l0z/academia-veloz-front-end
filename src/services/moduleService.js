import apiClient from './apiClient';

const ModuleService = {
  getModules: async () => {
    try {
      const response = await apiClient.get('/api/modulos/');
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar modulos:', error);
      throw error;
    }
  },

  getModuleById: async (id) => {
    try {
      const response = await apiClient.get(`/api/modulos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar modulo com id ${id}:`, error);
      throw error;
    }
  },

  getModuleByName: async (name) => {
    try {
      const response = await apiClient.get(`/api/modulos/?titulo=${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar modulo com name ${name}:`, error);
      throw error;
    }
  },

  updateModule: async (id, data) => {
    try {
      const response = await apiClient.patch(`/api/modulos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar modulo  com id ${id}:`, error);
      throw error;
    }
  },

  createModule: async (data) => {
    try {
      const response = await apiClient.post('/api/modulos/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar modulo:', error);
      throw error;
    }
  },

  deleteModule: async (id) => {
    try {
      const response = await apiClient.delete(`/api/modulos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar modulo com id ${id}:`, error);
      throw error;
    }
  },
};

export default ModuleService;
