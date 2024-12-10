import { winnerData } from '@/app/api/awards/winnerData'; // Supõe-se que você tenha um arquivo de dados para premiados
import apiClient from './apiClient';

const useMock = false;

const winnerService = {
  getWinners: async () => {
    if (useMock) {
      return {
        results: winnerData,
      };
    }

    try {
      const response = await apiClient.get('/api/premiados/'); // Atualize a rota adequada para os premiados
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar premiados:', error);
      throw error;
    }
  },

  getWinnerById: async (id) => {
    if (useMock) {
      return winnerData.find((winner) => winner.id === id);
    }

    try {
      const response = await apiClient.get(`/api/premiados/${id}/`); // Atualize a rota adequada para os premiados
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar premiado com id ${id}:`, error);
      throw error;
    }
  },

  getWinnerByName: async (name) => {
    if (useMock) {
      return winnerData.find((winner) => winner.name === name);
    }

    try {
      const response = await apiClient.get(`/api/premiados/?name=${name}`); // Atualizada a rota
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar premiado com nome ${name}:`, error);
      throw error;
    }
  },

  getWinnersEmblems: async () => {
    if (useMock) {
      return {
        results: winnerData,
      };
    }

    try {
      const response = await apiClient.get('/api/premiados-emblemas/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar premiados:', error);
      throw error;
    }
  },

  updateWinner: async (id, data) => {
    if (useMock) {
      const index = winnerData.findIndex((winner) => winner.id === id);
      winnerData[index] = { ...winnerData[index], ...data }; // Atualiza os dados
      return winnerData[index];
    }

    try {
      const response = await apiClient.patch(`/api/premiados/${id}/`, data); // Atualizada a rota
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar premiado com id ${id}:`, error);
      throw error;
    }
  },

  patchWinner: async (id, data) => {
    if (useMock) {
      const index = winnerData.findIndex((winner) => winner.id === id);
      winnerData[index] = { ...winnerData[index], ...data }; // Atualiza os dados
      return winnerData[index];
    }

    try {
      const response = await apiClient.patch(`/api/premiados/${id}/`, data); // Atualizada a rota
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar premiado com id ${id}:`, error);
      throw error;
    }
  },

  createWinner: async (data) => {
    if (useMock) {
      const newWinner = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      winnerData.push(newWinner);
      return newWinner;
    }

    try {
      const response = await apiClient.post('/api/premiados/', data); // Atualizada a rota
      return response.data;
    } catch (error) {
      console.error('Erro ao criar premiado:', error);
      throw error;
    }
  },

  deleteWinner: async (id) => {
    if (useMock) {
      const index = winnerData.findIndex((winner) => winner.id === id);
      winnerData.splice(index, 1);
      return true;
    }

    try {
      const response = await apiClient.delete(`/api/premiados/${id}/`); // Atualizada a rota
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar premiado com id ${id}:`, error);
      throw error;
    }
  },
};

export default winnerService;
