import { useState, useEffect } from 'react';
import ModuleService from '@/services/moduleService';

const useModule = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchModule = async () => {
      try {
        const response = await ModuleService.getModuleById(id);
        setModuleData(response);
      } catch (error) {
        setError('Ocorreu um erro ao buscar o modulo');
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  return { loading, error, moduleData };
};

export default useModule;
