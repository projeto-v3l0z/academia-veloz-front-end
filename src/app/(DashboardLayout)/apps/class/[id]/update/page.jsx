'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // Para pegar o id da URL

/* MUI */
import { Alert, Button, FormControl, Grid, MenuItem, Select, Stack } from '@mui/material';

/* hooks */
import useCourses from '@/hooks/courses/useCourses'; // Hook para buscar os dados do emblema
import useCoursesForm from '@/hooks/courses/useCoursesForm'; // Hook para lidar com a lógica do formulário de emblema
import PageContainer from '@/app/components/container/PageContainer'; // Container da página
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb'; // Breadcrumb para navegação
import ParentCard from '@/app/components/shared/ParentCard'; // Card para o conteúdo
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'; // Label customizado para os campos do formulário
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'; // Campo de texto customizado
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';
import AutoCompleteAlunos from '@/app/components/apps/courses/auto-complete/Auto-input-Alunos';

const CoursesUpdateForm = () => {
  const param = useParams();
  const { id } = param; // Pegando o id do emblema da URL

  // Buscando os dados do emblema
  const { loading, error, courseData } = useCourses(id);

  // Usando o hook para o formulário, passando os dados do emblema e o id
  const { formData, handleChange, handleSave, formErrors, success } = useCoursesForm(
    courseData,
    id,
  );

  // Exibe "Carregando..." enquanto os dados estão sendo carregados
  if (loading) return <div>Carregando...</div>;
  // Exibe a mensagem de erro, caso ocorra algum
  if (error) return <div>{error}</div>;

  return (
    <PageContainer
      title={'Editar curso'}
      description={'Formulário para atualização de curso'}
    >
      <Breadcrumb title="Editar curso" />

      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O curso foi atualizado com sucesso!
        </Alert>
      )}

      <ParentCard title="Editar curso">
        <Grid container spacing={3}>
          {/* Nome do Emblema */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="name">Nome do curso</CustomFormLabel>
            <CustomTextField
              name="name"
              placeholder="ex: Curso de Ouro"
              variant="outlined"
              fullWidth
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              {...(formErrors.name && { error: true, helperText: formErrors.name })}
            />
          </Grid>

          {/* Descrição do Emblema */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="description">Descrição</CustomFormLabel>
            <CustomTextField
              name="description"
              placeholder="ex: Este course é concedido aos melhores alunos."
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              {...(formErrors.description && { error: true, helperText: formErrors.description })}
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="descricao">Tipo do Curso</CustomFormLabel>
              <Select
                labelId="tipo-curso-label"
                id="tipo-curso-select"
                placeholder="Tipo do Curso"
                value={formData.tipo}
                defaultValue={''}
                onChange={(e) => handleChange('tipo', e.target.value)}
                {...(formErrors.tipo && { error: true, helperText: formErrors.tipo })}
              >
                <MenuItem value={'PUBLICO'}>Público</MenuItem>
                <MenuItem value={'PRIVADO'}>Privado</MenuItem>
                <MenuItem value={'IMERSAO'}>Imersão</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Campo de Seleção de Alunos */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="alunos">Selecionar Alunos</CustomFormLabel>
              <AutoCompleteAlunos
                fullWidth
                value={formData.alunos}
                onChange={(id) => handleChange('alunos', id)}
                {...(formErrors.alunos && { error: true, helperText: formErrors.alunos })}
              />
            </FormControl>
          </Grid>

          {/* Botão de Salvar */}
          <Grid item xs={12} sm={12} lg={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Editar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default CoursesUpdateForm;
