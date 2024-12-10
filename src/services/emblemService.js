import { emblemData } from '@/app/api/awards/emblemData'; // Mock de dados de emblemas
import apiClient from './apiClient';

const useMock = false;

const emblemService = {
  // Função para obter todos os emblemas
  getEmblems: async () => {
    if (useMock) {
      return {
        results: emblemData,
      };
    }

    try {
      const response = await apiClient.get('/api/emblemas/'); // Altere para a rota correta da sua API
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar emblemas:', error);
      throw error;
    }
  },

  // Função para obter um emblema pelo ID
  getEmblemById: async (id) => {
    if (useMock) {
      return emblemData.find((emblem) => emblem.id === id);
    }

    try {
      const response = await apiClient.get(`/api/emblemas/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar emblema com id ${id}:`, error);
      throw error;
    }
  },

  // Função para obter um emblema pelo nome
  getEmblemByName: async (name) => {
    if (useMock) {
      return emblemData.find((emblem) => emblem.name === name);
    }

    try {
      const response = await apiClient.get(`/api/emblemas/`);
      const filteredEmblems = response.data.results.filter((emblem) =>
        emblem.nome.toLowerCase().includes(name.toLowerCase()),
      );
      return {
        results: filteredEmblems,
      };
    } catch (error) {
      console.error(`Erro ao buscar emblema com nome ${name}:`, error);
      throw error;
    }
  },

  // Função para atualizar um emblema
  patchEmblem: async (id, data) => {
    if (useMock) {
      const index = emblemData.findIndex((emblem) => emblem.id === id);
      emblemData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/emblemas/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar emblema com id ${id}:`, error);
      throw error;
    }
  },

  // Função para atualizar um emblema
  updateEmblem: async (id, data) => {
    if (useMock) {
      const index = emblemData.findIndex((emblem) => emblem.id === id);
      emblemData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/emblemas/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar emblema com id ${id}:`, error);
      throw error;
    }
  },

  // Função para criar um novo emblema
  createEmblem: async (data) => {
    if (useMock) {
      const newEmblem = {
        id: Math.floor(Math.random() * 1000), // Gerar ID aleatório para o mock
        ...data,
      };
      emblemData.push(newEmblem);
      return newEmblem;
    }

    try {
      const response = await apiClient.post('/api/emblemas/', data); // Altere para a rota correta
      return response.data;
    } catch (error) {
      console.error('Erro ao criar emblema:', error);
      throw error;
    }
  },

  // Função para excluir um emblema
  deleteEmblem: async (id) => {
    if (useMock) {
      const index = emblemData.findIndex((emblem) => emblem.id === id);
      emblemData.splice(index, 1);
      return true;
    }

    try {
      const response = await apiClient.delete(`/api/emblemas/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar emblema com id ${id}:`, error);
      throw error;
    }
  },
};

export default emblemService;
