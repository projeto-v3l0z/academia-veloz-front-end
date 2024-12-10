import { useState, useEffect } from 'react';
import winnerService from '@/services/winnerService'; // Ajuste para o serviço de vencedores

const useWinnersForm = (initialData, id) => {
  const [formData, setFormData] = useState({
    nome: '',
    profissao: '', // Campo para o prêmio do vencedor
    imagem: [], // Campo para a imagem do vencedor
    emblemas: [], // Campo para os emblemas do vencedor
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        premio: initialData.premio || '', // Ajustado para inicializar o prêmio
        imagem: initialData.imagem || '', // Ajustado para inicializar a imagem
        emblemas: initialData.emblemas.map((item) => item.id) || [], // Ajustado para inicializar os emblemas
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log('Form data:', formData);
    const dataToSend = new FormData();
    dataToSend.append('nome', formData.nome);
    dataToSend.append('profissao', formData.profissao); // Ajuste para o campo de prêmio
    formData.emblemas.forEach((emblem) => {
      dataToSend.append('emblemas', emblem);
      console.log('Emblema:', emblem);
    });
    const is_file =
      formData.imagem instanceof File ||
      (formData.imagem instanceof FileList && formData.imagem.length > 0);

    if (is_file) {
      dataToSend.append('imagem', formData.imagem);
    }

    console.log('Data to send:', dataToSend);

    try {
      if (id) {
        if (is_file) {
          await winnerService.patchWinner(id, dataToSend); // Usando o serviço de vencedores
        } else {
          await winnerService.updateWinner(id, dataToSend); // Usando o serviço de vencedores
        }
      } else {
        await winnerService.createWinner(dataToSend); // Usando o serviço de vencedores
      }
      setFormErrors({});
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setFormErrors(err.response?.data || {});
      console.error(err.response?.data || err);
    }
  };

  return {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success,
  };
};

export default useWinnersForm;
