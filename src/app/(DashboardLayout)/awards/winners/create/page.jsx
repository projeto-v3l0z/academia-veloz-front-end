'use client';
import React, {
  useEffect,
  useState,
} from "react";
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

/* hooks */
import useWinnerForm from "@/hooks/winners/useWinnersForm"; // Ajuste o hook para o formulário de vencedores
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Alert, Button, Grid, Stack } from "@mui/material";
import ParentCard from "@/app/components/shared/ParentCard";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import AutoCompleteEmblems from "@/app/components/awards/auto-complete/Auto-input-Emblems";

const WinnerForm = () => {
  const router = useRouter();
  
  const {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success
  } = useWinnerForm(); // Mudando para um hook de formulário de vencedores
  const [imageFile, setImageFile] = useState(null);

  const handleRedirect = debounce(() => {
    router.push('/awards/winners'); // Atualize a rota para vencedores
  }, 2000);

  if (success) {
    handleRedirect();
  }

  // Função para lidar com a mudança da imagem
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImageFile(file);
		handleChange("imagem", file);
	};

  return (
    <PageContainer title={'Cadastro de Vencedor'} description={'Formulário para cadastro de novo Vencedor'}>
      <Breadcrumb title="Criar Premiado" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O vencedor foi cadastrado com sucesso!
        </Alert>
      )}
      <ParentCard title="Novo Premiado">
        <Grid container spacing={3}>
          {/* Nome do Vencedor */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="name">Nome do Premiado</CustomFormLabel>
            <CustomTextField
              name="name"
              placeholder="ex: João da Silva"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange('nome', e.target.value)} // Substituindo 'nome' conforme necessário
              {...(formErrors.name && { error: true, helperText: formErrors.name })}
            />
          </Grid>

          {/* Profissão do Vencedor */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="winner-job">Profissão</CustomFormLabel>
            <CustomTextField
              name="winner-job"
              placeholder="ex: Universitário"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange('profissao', e.target.value)} // Ajuste para o campo de prêmio
              {...(formErrors.award && { error: true, helperText: formErrors.award })}
            />
          </Grid>

          {/* Prêmio do Vencedor */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="award">Prêmios</CustomFormLabel>
            <AutoCompleteEmblems
              fullWidth
              onChange={(ids) => {
                handleChange("emblemas", ids);
              }}
              {...(formErrors.emblemas && {
                error: true,
                helperText: formErrors.emblemas,
              })}
            />
          </Grid>

          {/* Imagem */}
					<Grid item xs={12}>
						<CustomFormLabel htmlFor="banner">Imagem do Premiado</CustomFormLabel>
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							sx={{
								border: "1px solid #ccc",
								borderRadius: "4px",
								padding: "10px",
							}}
						>
							<Button
								variant="contained"
								component="label"
								color="primary"
								sx={{ flexShrink: 0 }}
							>
								{imageFile ? "Alterar Foto" : "Selecione uma foto"}
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									hidden
								/>
							</Button>
							<div
								style={{
									flexGrow: 1,
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
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
						<div style={{ marginTop: "10px" }}>
							{imageFile && (
								<img
									src={URL.createObjectURL(imageFile)}
									alt="Preview"
									style={{ maxWidth: "100px", maxHeight: "100px" }}
								/>
							)}
						</div>
						{formErrors.imagem && (
							<Alert severity="error">{formErrors.imagem}</Alert>
						)}
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

export default WinnerForm;
