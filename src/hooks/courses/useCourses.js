import { useState, useEffect } from 'react';
import CourseService from '@/services/courseService'; // Serviço que você utiliza para interagir com a API dos emblemas

const useCourse = (id) => {
  const [loading, setLoading] = useState(true); // Estado para saber se está carregando os dados
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [courseData, setCourseData] = useState(null); // Estado para armazenar os dados do emblema

  useEffect(() => {
    if (!id) return; // Se não houver id, não tenta buscar os dados

    const fetchCourse = async () => {
      try {
        const response = await CourseService.getCourseById(id); // Chama o serviço para buscar o emblema
        console.log(response);
        setCourseData(response); // Armazena os dados do emblema no estado
      } catch (error) {
        setError('Ocorreu um erro ao buscar o course'); // Se houver erro, define a mensagem de erro
      } finally {
        setLoading(false); // Define o estado de carregamento como false após a requisição
      }
    };

    fetchCourse(); // Chama a função de buscar o emblema
  }, [id]); // A requisição é feita sempre que o id mudar

  return { loading, error, courseData }; // Retorna o estado de carregamento, erro e os dados do emblema
};

export default useCourse;
