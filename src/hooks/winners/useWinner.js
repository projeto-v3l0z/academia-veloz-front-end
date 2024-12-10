import { useState, useEffect } from 'react';

import winnerService from '@/services/winnerService';

const useWinner = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [winnerData, setWinnerData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchWinner = async () => {
      try {
        const response = await winnerService.getWinnerById(id);
        setWinnerData(response);
      } catch (error) {
        setError('Ocorreu um erro ao buscar o vencedor');
      } finally {
        setLoading(false);
      }
    };

    fetchWinner();
  }, [id]);

  return { loading, error, winnerData };
};

export default useWinner;
