'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // Para pegar o id da URL

/* MUI */
import { Alert, Button, Grid, Stack } from '@mui/material';

/* hooks */
import useEmblem from '@/hooks/emblems/useEmblem.'; // Hook para buscar os dados do emblema
import useEmblemForm from '@/hooks/emblems/useEmblemForm'; // Hook para lidar com a lógica do formulário de emblema
import PageContainer from '@/app/components/container/PageContainer'; // Container da página
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb'; // Breadcrumb para navegação
import ParentCard from '@/app/components/shared/ParentCard'; // Card para o conteúdo
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'; // Label customizado para os campos do formulário
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'; // Campo de texto customizado
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';

const EmblemUpdateForm = () => {
  const param = useParams();
  const { id } = param; // Pegando o id do emblema da URL

  // Buscando os dados do emblema
  const { loading, error, emblemData } = useEmblem(id);

  // Usando o hook para o formulário, passando os dados do emblema e o id
  const { formData, handleChange, handleSave, formErrors, success } = useEmblemForm(emblemData, id);
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
    <PageContainer
      title={'Cadastro de Emblema'}
      description={'Formulário para atualização de emblema'}
    >
      <Breadcrumb title="Editar Emblema" />

      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O curso foi atualizado com sucesso!
        </Alert>
      )}

      <ParentCard title="Editar Emblema">
        <Grid container spacing={3}>
          {/* Nome do Curso */}
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

          {/* Instituição */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="address">Instituição</CustomFormLabel>
            <AutoCompleteInstitutions
              fullWidth
              value={formData.instituicao}
              onChange={(id) => handleChange('instituicao', id)}
              {...(formErrors.instituicao && { error: true, helperText: formErrors.instituicao })}
            />
          </Grid>

          {/* Descrição do Curso */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="description">Descrição</CustomFormLabel>
            <CustomTextField
              name="description"
              placeholder="ex: Este emblema é concedido aos melhores alunos."
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              {...(formErrors.description && { error: true, helperText: formErrors.description })}
            />
          </Grid>

          {/* Campo: Upload do Banner */}
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="banner">
              Imagem do <Curso></Curso>
            </CustomFormLabel>
            {/* Container com borda cinza */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
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

              {/* Exibe o nome do arquivo ou o nome do banner existente */}
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
                  <span>Nenhum Imagem selecionada</span>
                )}
              </div>
            </Stack>

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

export default EmblemUpdateForm;
