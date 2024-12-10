import { useState, useEffect } from 'react';
import instituteService from '@/services/instituteService';

const useInstituteForm = (initialData, id) => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        endereco: initialData.localizacao || '',
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const dataToSend = {
      nome: formData.nome,
      localizacao: formData.endereco,
    };

    try {
      if (id) {
        await instituteService.updateInstitution(id, dataToSend);
      } else {
        await instituteService.createInstitution(dataToSend);
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

export default useInstituteForm;
