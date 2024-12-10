import { useState, useEffect } from 'react';

import winnerService from '@/services/winnerService'; // Atualização para o serviço de premiados

const useWinners = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [winners, setWinners] = useState([]); // Inicializa como um array vazio

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await winnerService.getWinners(); // Chama o serviço para obter todos os premiados
        // Mapeia os dados para o formato desejado
        console.log('Response: ', response);
        const formattedWinners = response.results.map((winner) => ({
          name: winner.nome, // Assegure-se de que 'name' existe
          institution: winner.instituicao?.nome || 'Unama', // Assegure-se de que 'institution' existe
          award: winner.award || 'Premiação Padrão', // Define um valor padrão se 'award' não existir
          image: winner.image || '/images/default.png', // Um valor padrão para a imagem se não estiver disponível
        }));
        console.log('Formatado:', formattedWinners);
        setWinners(formattedWinners);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os premiados');
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []); // Não precisa de dependências

  return { loading, error, winners }; // Retorna os premiados formatados
};

export default useWinners;
