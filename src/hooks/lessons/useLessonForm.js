import { useState, useEffect } from 'react';

import LessonService from '@/services/lessonService';

const useLessonForm = (initialData, id) => {
  const [formData, setFormData] = useState({
    modulo: '',
    titulo: '',
    tipo_conteudo: '',
    conteudo: '',
    video_link: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Preenche os dados do formulário caso haja `initialData`
  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData({
        modulo: initialData.modulo.id || '',
        titulo: initialData.titulo || '',
        tipo_conteudo: initialData.tipo_conteudo || '',
        conteudo: initialData.conteudo || '',
        video_link: initialData.video_link || '',
      });
    }
  }, [initialData]);

  // Lida com a mudança de valores nos campos do formulário
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para salvar o emblema
  const handleSave = async () => {
    const dataToSend = new FormData();
    console.log(formData.modulo);
    // Adiciona os campos ao FormData
    dataToSend.append('modulo_id', Number(formData.modulo));
    dataToSend.append('titulo', formData.titulo);
    dataToSend.append('tipo_conteudo', formData.tipo_conteudo);
    dataToSend.append('conteudo', formData.conteudo);
    dataToSend.append('video_link', formData.video_link);
    try {
      // Envia os dados para a API de criação ou atualização
      if (id) {
        await LessonService.updateLesson(id, dataToSend); // Atualiza o emblema caso
      } else {
        await LessonService.createLesson(dataToSend); // Cria novo emblema caso contrário
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

export default useLessonForm;
