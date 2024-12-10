import { useState, useEffect } from 'react';

import instituteService from '@/services/instituteService';

const useInstitute = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instituteData, setInstituteData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchInstitute = async () => {
      try {
        const response = await instituteService.getInstitutionById(id);
        setInstituteData(response);
      } catch (error) {
        setError('Ocorreu um erro ao buscar a instituição');
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, [id]);

  return { loading, error, instituteData };
};

export default useInstitute;
