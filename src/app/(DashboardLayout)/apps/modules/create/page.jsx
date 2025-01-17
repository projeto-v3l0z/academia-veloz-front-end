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
import AutoCompleteAlunos from '@/app/components/apps/courses/auto-complete/Auto-input-Alunos';

const ModuleForm = () => {
  const router = useRouter();

  // Desestruturando do hook de formulário do emblema
  const { formData, handleChange, handleSave, formErrors, success } = useModuleForm();

  // Redirecionamento após sucesso
  if (success) {
    router.push('/apps/modules');
  }

  return (
    <PageContainer
      title={'Cadastro de Curso'}
      description={'Formulário para cadastro de novo Curso'}
    >
      <Breadcrumb title="Criar Curso" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O curso foi cadastrado com sucesso!
        </Alert>
      )}

      <ParentCard title="Novo Curso">
        {/* Campo de Seleção de Alunos */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="alunos">Selecionar Alunos</CustomFormLabel>
            <AutoCompleteAlunos
              fullWidth
              onChange={(id) => handleChange('courses', id)}
              {...(formErrors.alunos && { error: true, helperText: formErrors.alunos })}
            />
          </FormControl>
        </Grid>

        <Grid container spacing={3}>
          {/* Descrição do Emblema */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="descricao">Descrição</CustomFormLabel>
            <CustomTextField
              name="descricao"
              placeholder="Descrição do curso"
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

export default ModuleForm;
