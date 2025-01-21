'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // Para pegar o id da URL

/* MUI */
import { Alert, Button, FormControl, Grid, MenuItem, Select, Stack } from '@mui/material';

/* hooks */
import useModule from '@/hooks/modules/useModule'; // Hook para buscar os dados do emblema
import useModuleForm from '@/hooks/modules/useModuleForm'; // Hook para lidar com a lógica do formulário de emblema
import PageContainer from '@/app/components/container/PageContainer'; // Container da página
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb'; // Breadcrumb para navegação
import ParentCard from '@/app/components/shared/ParentCard'; // Card para o conteúdo
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'; // Label customizado para os campos do formulário
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'; // Campo de texto customizado
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';
import AutoCompleteCourses from '@/app/components/apps/modules/auto-complete/Auto-input-Courses';

const ModulesUpdateForm = () => {
  const param = useParams();
  const { id } = param; // Pegando o id do emblema da URL

  // Buscando os dados do emblema
  const { loading, error, moduleData } = useModule(id);

  // Usando o hook para o formulário, passando os dados do emblema e o id
  const { formData, handleChange, handleSave, formErrors, success } = useModuleForm(moduleData, id);

  // Exibe "Carregando..." enquanto os dados estão sendo carregados
  if (loading) return <div>Carregando...</div>;
  // Exibe a mensagem de erro, caso ocorra algum
  if (error) return <div>{error}</div>;

  return (
    <PageContainer
      title={'Cadastro de module'}
      description={'Formulário para cadastro de novo Curso'}
    >
      <Breadcrumb title="Criar Module" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O module foi cadastrado com sucesso!
        </Alert>
      )}

      <ParentCard title="Novo module">
        {/* Campo de Seleção de Alunos */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="courses">Selecionar module</CustomFormLabel>
            <AutoCompleteCourses
              value={formData.curso.id}
              fullWidth
              onChange={(id) => handleChange('curso', id)}
              {...(formErrors.course && { error: true, helperText: formErrors.courses })}
            />
          </FormControl>
        </Grid>

        <CustomFormLabel htmlFor="nome">Título</CustomFormLabel>
        <CustomTextField
          name="nome"
          variant="outlined"
          fullWidth
          value={formData.titulo}
          onChange={(e) => handleChange('titulo', e.target.value)}
          onBlur={() => {}}
          error={formErrors.nome}
          helperText={formErrors.nome}
        />

        <Grid container spacing={3}>
          {/* Descrição do Emblema */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="descricao">Descrição</CustomFormLabel>
            <CustomTextField
              name="descricao"
              placeholder="Descrição do module"
              variant="outlined"
              value={formData.descricao}
              fullWidth
              multiline
              rows={14}
              onChange={(e) => handleChange('descricao', e.target.value)}
              {...(formErrors.descricao && { error: true, helperText: formErrors.descricao })}
            />
          </Grid>

          {/* Botão de Salvar */}
          <Grid item xs={12} sm={12} lg={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Salvar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default ModulesUpdateForm;
