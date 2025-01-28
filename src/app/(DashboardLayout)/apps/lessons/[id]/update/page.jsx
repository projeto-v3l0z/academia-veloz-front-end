'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // Para pegar o id da URL

/* MUI */
import { Alert, Button, FormControl, Grid, MenuItem, Select, Stack } from '@mui/material';

/* hooks */
import useLesson from '@/hooks/lessons/useLesson'; // Hook para buscar os dados do emblema
import useLessonForm from '@/hooks/lessons/useLessonForm'; // Hook para lidar com a lógica do formulário de emblema
import PageContainer from '@/app/components/container/PageContainer'; // Container da página
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb'; // Breadcrumb para navegação
import ParentCard from '@/app/components/shared/ParentCard'; // Card para o conteúdo
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'; // Label customizado para os campos do formulário
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'; // Campo de texto customizado

import AutoCompleteModules from '@/app/components/apps/lessons/auto-complete/Auto-input-Modules';
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';

const LessonUpdateForm = () => {
  const param = useParams();
  const { id } = param; // Pegando o id do emblema da URL

  // Buscando os dados do emblema
  const { loading, error, lessonData } = useLesson(id);

  // Usando o hook para o formulário, passando os dados do emblema e o id
  const { formData, handleChange, handleSave, formErrors, success } = useLessonForm(lessonData, id);

  // Exibe "Carregando..." enquanto os dados estão sendo carregados
  if (loading) return <div>Carregando...</div>;
  // Exibe a mensagem de erro, caso ocorra algum
  if (error) return <div>{error}</div>;

  return (
    <PageContainer
      title={'Editar aula'}
      description={'Formulário para edição de aula de modulo'}
    >
      <Breadcrumb title="Editar aula" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          A aula foi editada com sucesso!
        </Alert>
      )}

      <ParentCard title="Editar aula">
        {/* Campo de Seleção de Modulo */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="modulo">Selecionar modulo</CustomFormLabel>
            <AutoCompleteModules
              fullWidth
              value={formData.modulo}
              onChange={(id) => handleChange('modulo', id)}
              {...(formErrors.modulo && { error: true, helperText: formErrors.modulo })}
            />
          </FormControl>
        </Grid>

        <CustomFormLabel htmlFor="titulo">Título</CustomFormLabel>
        <CustomTextField
          name="titulo"
          variant="outlined"
          fullWidth
          value={formData.titulo}
          onChange={(e) => handleChange('titulo', e.target.value)}
          onBlur={() => {}}
          error={formErrors.titulo}
          helperText={formErrors.titulo}
        />

        <CustomFormLabel htmlFor="video_link">Link do video</CustomFormLabel>
        <CustomTextField
          name="video_link"
          variant="outlined"
          fullWidth
          value={formData.video_link}
          onChange={(e) => handleChange('video_link', e.target.value)}
          onBlur={() => {}}
          error={formErrors.video_link}
          helperText={formErrors.video_link}
        />

        <CustomFormLabel htmlFor="tipo_conteudo">Tipo de conteúdo</CustomFormLabel>
        <CustomSelect
          name="tipo_conteudo"
          value={formData.tipo_conteudo}
          fullWidth
          onChange={(e) => handleChange('tipo_conteudo', e.target.value)}
          error={formErrors.tipo_conteudo}
          helperText={formErrors.tipo_conteudo}
        >
          <MenuItem value="VIDEO">VIDEO</MenuItem>
          <MenuItem value="TEXTO">TEXTO</MenuItem>
          <MenuItem value="ARQUIVO">ARQUIVO</MenuItem>
        </CustomSelect>

        <Grid container spacing={3}>
          {/* Descrição do Emblema */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="conteudo">Conteúdo</CustomFormLabel>
            <CustomTextField
              name="conteudo"
              placeholder="Conteúdo da aula"
              variant="outlined"
              fullWidth
              multiline
              rows={14}
              value={formData.conteudo}
              onChange={(e) => handleChange('conteudo', e.target.value)}
              {...(formErrors.conteudo && { error: true, helperText: formErrors.conteudo })}
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

export default LessonUpdateForm;
