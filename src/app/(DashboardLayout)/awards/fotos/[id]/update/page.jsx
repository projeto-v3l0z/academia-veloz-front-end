'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

import { Alert, Button, Grid, Stack } from '@mui/material';

import useFoto from '@/hooks/fotos/useFoto';
import useFotoForm from '@/hooks/fotos/useFotoForm';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/components/shared/ParentCard';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';
import AutoCompleteEvents from '@/app/components/awards/auto-complete/Auto-Input-Events';

const FotoUpdateForm = () => {
  const param = useParams();
  const { id } = param; // Pegando o id da foto da URL

  // Buscando os dados da foto
  const { loading, error, fotoData } = useFoto(id);

  // Usando o hook para o formulário de foto
  const {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success
  } = useFotoForm(fotoData, id);

  const [imageFile, setImageFile] = useState(null);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    handleChange('imagem', file);
  };

  // Exibe "Carregando..." enquanto os dados estão sendo carregados
  if (loading) return <div>Carregando...</div>;
  // Exibe a mensagem de erro, caso ocorra algum
  if (error) return <div>{error}</div>;

  return (
    <PageContainer title={'Atualização de Foto'} description={'Formulário para atualizar a foto'}>
      <Breadcrumb title="Editar Foto" />

      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          A foto foi atualizada com sucesso!
        </Alert>
      )}

      <ParentCard title="Editar Foto">
        <Grid container spacing={3}>
          {/* Campo: Seleção do Evento */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="evento">Evento</CustomFormLabel>
            <AutoCompleteEvents
							fullWidth
              value={formData.evento}
							onChange={(id) => handleChange("evento", id)}
							{...(formErrors.evento && { error: true, helperText: formErrors.evento })}
						/>
          </Grid>

          {/* Campo: Upload da Imagem */}
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="imagem">Imagem</CustomFormLabel>
            {/* Container com borda cinza */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
              }}
            >
              {/* Botão para upload */}
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ flexShrink: 0 }} // Garante que o botão não encolha
              >
                {imageFile ? 'Alterar Imagem' : 'Selecionar Imagem'}
                <input type="file" accept="image/*" onChange={handleImagemChange} hidden />
              </Button>

              {/* Exibe o nome do arquivo ou o nome da imagem existente */}
              <div
                style={{
                  flexGrow: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {imageFile ? (
                  <strong>{imageFile.name}</strong>
                ) : formData.imagem ? (
                  <strong>{formData.imagem.name || formData.imagem}</strong>
                ) : (
                  <span>Nenhuma imagem selecionada</span>
                )}
              </div>
            </Stack>

            {/* Exibe a pré-visualização da imagem */}
            {imageFile && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </div>
            )}

            {formErrors.imagem && <Alert severity="error">{formErrors.imagem}</Alert>}
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

export default FotoUpdateForm;
