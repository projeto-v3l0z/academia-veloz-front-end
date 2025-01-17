'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* hooks */
import useCoursesForm from '@/hooks/courses/useCoursesForm';
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

const CoursesForm = () => {
  const router = useRouter();

  // Desestruturando do hook de formulário do emblema
  const { formData, handleChange, handleSave, formErrors, success } = useCoursesForm();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    handleChange('imagem', file);
  };

  // Redirecionamento após sucesso
  if (success) {
    router.push('/apps/class');
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
        <Grid container spacing={3}>
          {/* Nome do Emblema */}
          <Grid item xs={12} sm={12} lg={20}>
            <CustomFormLabel htmlFor="nome">Nome do Curso</CustomFormLabel>
            <CustomTextField
              name="nome"
              placeholder="ex: Curso de programação em react"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange('nome', e.target.value)}
              onBlur={() => {}}
              {...(formErrors.nome && { error: true, helperText: formErrors.nome })}
            />
          </Grid>

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

          <Grid item xs={12} sm={12} lg={6}>
            <FormControl fullWidth>
              <CustomFormLabel htmlFor="descricao">Tipo do Curso</CustomFormLabel>
              <Select
                labelId="tipo-curso-label"
                id="tipo-curso-select"
                placeholder="Tipo do Curso"
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

export default CoursesForm;
