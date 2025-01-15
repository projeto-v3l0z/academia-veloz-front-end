import { useState, useEffect } from 'react';
import CourseService from '@/services/courseService.js';

const useCourse = (initialData, id) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: '',
    alunos: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Preenche os dados do formulário caso haja `initialData`
  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        tipo: initialData.tipo || '',
        alunos: initialData.alunos || [],
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

    // Adiciona os campos ao FormData
    dataToSend.append('nome', formData.nome);
    dataToSend.append('descricao', formData.descricao);
    dataToSend.append('tipo', formData.tipo);
    dataToSend.append('alunos', JSON.stringify(formData.alunos));

    try {
      // Envia os dados para a API de criação ou atualização
      if (id) {
        await CourseService.updateCourse(id, dataToSend); // Atualiza o emblema caso
      } else {
        await CourseService.createCourse(dataToSend); // Cria novo emblema caso contrário
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

export default useCourse;
