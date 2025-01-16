
import { useState, useEffect } from 'react';
import ModuleService from '@/services/moduleService';  // Serviço que você utiliza para interagir com a API dos emblemas

const useModule = (id) => {
  const [loading, setLoading] = useState(true); // Estado para saber se está carregando os dados
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [moduleData, setModuleData] = useState(null); // Estado para armazenar os dados do emblema

  useEffect(() => {
    if (!id) return; // Se não houver id, não tenta buscar os dados

    const fetchModule = async () => {
      try {
        const response = await ModuleService.getModuleById(id); // Chama o serviço para buscar o emblema
        setModuleData(response); // Armazena os dados do emblema no estado
      } catch (error) {
        setError('Ocorreu um erro ao buscar o modulo'); // Se houver erro, define a mensagem de erro
      } finally {
        setLoading(false); // Define o estado de carregamento como false após a requisição
      }
    };

    fetchModule(); // Chama a função de buscar o emblema
  }, [id]); // A requisição é feita sempre que o id mudar

  return { loading, error, moduleData }; // Retorna o estado de carregamento, erro e os dados do emblema
};

export default useModule;
