import { useState, useEffect } from 'react';

import useModule from './useModule';
import ModuleService from '@/services/moduleService';

const useModule = (initialData, id) => {
  const [formData, setFormData] = useState({
    curso: '',
    titulo: '',
    descricao: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Preenche os dados do formulário caso haja `initialData`
  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData({
        curso: initialData.curso || '',
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
      });
    }
  }, [initialData]); 

  // Lida com a mudança de valores nos campos do formulário
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para salvar o emblema
  const handleSave = async () =>{
    const dataToSend = new FormData();

    // Adiciona os campos ao FormData
    dataToSend.append('curso', formData.curso);
    dataToSend.append('titulo', formData.titulo);
    dataToSend.append('descricao', formData.descricao);


    try {
      // Envia os dados para a API de criação ou atualização
      if (id) {
        await ModuleService.updateModule(id, dataToSend); // Atualiza o emblema caso
      } else {
        await ModuleService.createModule(dataToSend); // Cria novo emblema caso contrário
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

export default useModule;
