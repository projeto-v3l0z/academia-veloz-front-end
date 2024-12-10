'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* hooks */
import useEmblemForm from "@/hooks/emblems/useEmblemForm";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Alert, Button, Grid, Stack } from "@mui/material";
import ParentCard from "@/app/components/shared/ParentCard";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';


const EmblemForm = () => {
  const router = useRouter();

  // Desestruturando do hook de formulário do emblema
  const {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success,
  } = useEmblemForm();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    handleChange('imagem', file);
  };

  // Redirecionamento após sucesso
  if (success) {
    router.push('/awards/emblema');
  }

  return (
    <PageContainer title={'Cadastro de Emblema'} description={'Formulário para cadastro de novo Emblema'}>
      <Breadcrumb title="Criar Emblema" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O emblema foi cadastrado com sucesso!
        </Alert>
      )}
      <ParentCard title="Novo Emblema">
        <Grid container spacing={3}>
          {/* Nome do Emblema */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="nome">Nome do Emblema</CustomFormLabel>
            <CustomTextField
              name="nome"
              placeholder="ex: Emblema da Universidade da Amazônia"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange('nome', e.target.value)}
              {...(formErrors.nome && { error: true, helperText: formErrors.nome })}
            />
          </Grid>

          {/* Instituição */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="instituicao">Instituição</CustomFormLabel>
            <AutoCompleteInstitutions
              fullWidth
              onChange={(id) => handleChange('instituicao', id)}
              {...(formErrors.instituicao && { error: true, helperText: formErrors.instituicao })}
            />
          </Grid>

          {/* Descrição do Emblema */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="descricao">Descrição</CustomFormLabel>
            <CustomTextField
              name="descricao"
              placeholder="Descrição do emblema"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={(e) => handleChange('descricao', e.target.value)}
              {...(formErrors.descricao && { error: true, helperText: formErrors.descricao })}
            />
          </Grid>

          {/* Imagem do Emblema */}
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="banner">Imagem</CustomFormLabel>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ flexShrink: 0 }} // Garante que o botão não encolha
              >
                {imageFile ? 'Alterar Banner' : 'Selecionar Banner'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
              <div style={{ flexGrow: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {imageFile ? (
                  <strong>{imageFile.name}</strong>
                ) : formData.imagem ? (
                  <strong>{formData.imagem.name || formData.imagem}</strong>
                ) : (
                  <span>Nenhum imagem selecionada</span>
                )}
              </div>
            </Stack>
            {formErrors.imagem && <Alert severity="error">{formErrors.imagem}</Alert>}
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

export default EmblemForm;
