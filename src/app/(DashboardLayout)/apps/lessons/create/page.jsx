'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* hooks */
import useLessonForm from '@/hooks/lessons/useLessonForm';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import ParentCard from '@/app/components/shared/ParentCard';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';

import ChildCard from '@/app/components/shared/ChildCard';
import PositionCheckboxCode from '@/app/components/forms/form-elements/checkbox/code/PositionCheckboxCode';
import PositionCheckbox from '@/app/components/forms/form-elements/checkbox/Position';

import AutoCompleteModules from '@/app/components/apps/lessons/auto-complete/Auto-input-Modules';

const LessonForm = () => {
  const router = useRouter();

  // Desestruturando do hook de formulário do emblema
  const { formData, handleChange, handleSave, formErrors, success } = useLessonForm();

  // Redirecionamento após sucesso
  if (success) {
    router.push('/apps/lessons');
  }

  return (
    <PageContainer
      title={'Cadastro de aula'}
      description={'Formulário para cadastro de nova aula de modulo'}
    >
      <Breadcrumb title="Criar aula" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          A aula foi cadastrada com sucesso!
        </Alert>
      )}

      <ParentCard title="Nova aula">
        {/* Campo de Seleção de Modulo */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="modulo">Selecionar modulo</CustomFormLabel>
            <AutoCompleteModules
              fullWidth
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
          onChange={(e) => handleChange('video_link', e.target.value)}
          onBlur={() => {}}
          error={formErrors.video_link}
          helperText={formErrors.video_link}
        />

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

export default LessonForm;
