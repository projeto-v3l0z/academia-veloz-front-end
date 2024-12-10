import { useState, useEffect } from 'react';
import emblemService from '@/services/emblemService'; // Serviço que você utiliza para interagir com a API dos emblemas

const useEmblem = (id) => {
  const [loading, setLoading] = useState(true); // Estado para saber se está carregando os dados
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [emblemData, setEmblemData] = useState(null); // Estado para armazenar os dados do emblema

  useEffect(() => {
    if (!id) return; // Se não houver id, não tenta buscar os dados

    const fetchEmblem = async () => {
      try {
        const response = await emblemService.getEmblemById(id); // Chama o serviço para buscar o emblema
        setEmblemData(response); // Armazena os dados do emblema no estado
      } catch (error) {
        setError('Ocorreu um erro ao buscar o emblema'); // Se houver erro, define a mensagem de erro
      } finally {
        setLoading(false); // Define o estado de carregamento como false após a requisição
      }
    };

    fetchEmblem(); // Chama a função de buscar o emblema
  }, [id]); // A requisição é feita sempre que o id mudar

  return { loading, error, emblemData }; // Retorna o estado de carregamento, erro e os dados do emblema
};

export default useEmblem;
