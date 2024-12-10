import { useState, useEffect } from 'react';
import fotoService from '@/services/fotoService'; 

const useFoto = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fotoData, setFotoData] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchFoto = async () => {
      try {
        const response = await fotoService.getFotosById(id, { signal: controller.signal });
        setFotoData(response);
      } catch (error) {
        if (error.name !== 'AbortError') {
          const message = error.response?.data?.message || 'Erro desconhecido ao buscar a foto.';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFoto();

    return () => controller.abort();
  }, [id]);

  return { loading, error, fotoData }; 
};

export default useFoto;
