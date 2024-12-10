import { useState, useEffect } from 'react';
import eventService from '@/services/eventService';
import { formatOnlyDate } from '@/utils/formatDate';

const useEventForm = (initialData, id) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    data: '',
    instituicao: null,
    premiados: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        data: initialData.data || '',
        instituicao: initialData.instituicao.id || null,
        premiados: initialData.premiados.map((item) => item.id) || [],
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const dataToSend = new FormData();

    dataToSend.append('nome', formData.nome);
    dataToSend.append('descricao', formData.descricao);
    dataToSend.append('data', formData.data ? formatOnlyDate(formData.data) : null);
    dataToSend.append('instituicao_id', formData.instituicao);

    formData.premiados.forEach((premiado) => {
      console.log('Premiado: ', premiado);
      dataToSend.append('premiados_ids', premiado);
    });

    try {
      if (id) {
        await eventService.updateEvent(id, dataToSend);
      } else {
        await eventService.createEvent(dataToSend);
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

export default useEventForm;
