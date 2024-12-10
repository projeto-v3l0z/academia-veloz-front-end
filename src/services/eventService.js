import { eventData } from '@/app/api/awards/eventData';
import apiClient from './apiClient';

const useMock = false;

const eventService = {
  getEvents: async () => {
    if (useMock) {
      return {
        results: eventData,
      };
    }

    try {
      const response = await apiClient.get('/api/eventos/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  },

  getEventById: async (id) => {
    if (useMock) {
      return eventData.find((event) => event.id === id);
    }

    try {
      const response = await apiClient.get(`/api/eventos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar evento com id ${id}:`, error);
      throw error;
    }
  },

  getEventByName: async (name) => {
    if (useMock) {
      return eventData.find((event) => event.name === name);
    }

    try {
      const response = await apiClient.get(`/api/eventos/`);
      console.log('response', response);
      const filteredEvents = response.data.results.filter((event) =>
        event.nome.toLowerCase().includes(name.toLowerCase()),
      );
      console.log('filteredEvents', filteredEvents);
      return {
        results: filteredEvents,
      };
    } catch (error) {
      console.error(`Erro ao buscar evento com id ${name}:`, error);
      throw error;
    }
  },

  updateEvent: async (id, data) => {
    if (useMock) {
      const index = eventData.findIndex((event) => event.id === id);
      eventData[index] = data;
      return data;
    }

    try {
      const response = await apiClient.patch(`/api/eventos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar evento com id ${id}:`, error);
      throw error;
    }
  },

  createEvent: async (data) => {
    if (useMock) {
      const newEvent = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      eventData.push(newEvent);
      return newEvent;
    }

    try {
      const response = await apiClient.post('/api/eventos/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  },

  deleteEvent: async (id) => {
    if (useMock) {
      const index = eventData.findIndex((event) => event.id === id);
      eventData.splice(index, 1);
      return true;
    }

    try {
      const response = await apiClient.delete(`/api/eventos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar evento com id ${id}:`, error);
      throw error;
    }
  },
};

export default eventService;
