import { useState, useEffect } from 'react';

import LessonService from '@/services/lessonService';


const useLesson = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const response = await LessonService.getLessonById(id);
        setLessonData(response);
      } catch (error) {
        setError('Ocorreu um erro ao buscar a aula');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  return { loading, error, lessonData };
};

export default useLesson;
