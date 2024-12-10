import { useState, useEffect } from 'react';
import fotoService from '@/services/fotoService';

const useFotoForm = (initialData, id) => {
  const [formData, setFormData] = useState({
    evento: null,
    imagem: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        evento: initialData.evento.id || null,
        imagem: initialData.imagem || null,
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.evento) errors.evento = 'O campo "eventos" é obrigatório.';
    if (!formData.imagem) errors.imagem = 'Selecione uma imagem.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const dataToSend = new FormData();
    const isFile =
      formData.imagem instanceof File ||
      (formData.imagem instanceof FileList && formData.imagem.length > 0);

    dataToSend.append('evento_id', formData.evento);
    if (isFile) {
      dataToSend.append('imagem', formData.imagem);
    }

    try {
      if (id) {
        if (!isFile) {
          await fotoService.patchFotos(id, dataToSend);
        } else {
          await fotoService.updateFotos(id, dataToSend);
        }
      } else {
        await fotoService.createFotos(dataToSend);
      }
      setFormErrors({});
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      const errors = err.response?.data || { general: 'Erro ao salvar dados.' };
      setFormErrors(errors);
      console.error(errors);
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

export default useFotoForm;
