import { useState, useEffect } from 'react';

import eventService from '@/services/eventService';

const useEvent = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const response = await eventService.getEventById(id);
        setEventData(response);
      } catch (error) {
        setError('Ocorreu um erro ao buscar o evento');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { loading, error, eventData };
};

export default useEvent;
