import apiClient from './apiClient';

const LessonService = {
  getLessons: async () => {
    try {
      const response = await apiClient.get('/api/aulas/');
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
      throw error;
    }
  },

  getLessonById: async (id) => {
    try {
      const response = await apiClient.get(`/api/aulas/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aula com id ${id}:`, error);
      throw error;
    }
  },

  getLessonByName: async (name) => {
    try {
      const response = await apiClient.get(`/api/aulas/?titulo=${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aula com name ${name}:`, error);
      throw error;
    }
  },

  updateLesson: async (id, data) => {
    try {
      const response = await apiClient.patch(`/api/aulas/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aula  com id ${id}:`, error);
      throw error;
    }
  },

  createLesson: async (data) => {
    try {
      const response = await apiClient.post('/api/aulas/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aula:', error);
      throw error;
    }
  },

  deleteLesson: async (id) => {
    try {
      const response = await apiClient.delete(`/api/aulas/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar Aula com id ${id}:`, error);
      throw error;
    }
  },
};

export default LessonService;
