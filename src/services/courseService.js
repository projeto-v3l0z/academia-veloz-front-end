import { eventData } from '@/app/api/awards/eventData';
import apiClient from './apiClient';

const CourseService = {
  getCourses: async () => {
    try {
      const response = await apiClient.get('/api/cursos/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await apiClient.get(`/api/cursos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar curso com id ${id}:`, error);
      throw error;
    }
  },

  getCourseByName: async (name) => {
    try {
      const response = await apiClient.get(`/api/cursos/?nome=${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar curso com name ${name}:`, error);
      throw error;
    }
  },

  updateCourse: async (id, data) => {
    try {
      const response = await apiClient.patch(`/api/cursos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar curso com id ${id}:`, error);
      throw error;
    }
  },

  createCourse: async (data) => {
    try {
      const response = await apiClient.post('/api/cursos/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await apiClient.delete(`/api/cursos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar curso com id ${id}:`, error);
      throw error;
    }
  },
};

export default CourseService;
