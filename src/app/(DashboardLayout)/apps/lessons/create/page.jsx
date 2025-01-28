'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* hooks */
import useModuleForm from '@/hooks/modules/useModuleForm';
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
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';
import ChildCard from '@/app/components/shared/ChildCard';
import PositionCheckboxCode from '@/app/components/forms/form-elements/checkbox/code/PositionCheckboxCode';
import PositionCheckbox from '@/app/components/forms/form-elements/checkbox/Position';
import AutoCompleteCourses from '@/app/components/apps/modules/auto-complete/Auto-input-Courses';

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
              <CustomFormLabel htmlFor="courses">Selecionar modulo</CustomFormLabel>
            <AutoCompleteCourses
              fullWidth
              onChange={(id) => handleChange('modulo', id)}
              {...(formErrors.course && { error: true, helperText: formErrors.courses })}
            />
          </FormControl>
        </Grid>

        <CustomFormLabel htmlFor="nome">Título</CustomFormLabel>
        <CustomTextField
          name="nome"
          variant="outlined"
          fullWidth
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
              placeholder="Descrição do modulo"
              variant="outlined"
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

export default LessonForm;
