"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* hooks */
import useFotoForm from "@/hooks/fotos/useFotoForm";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Alert, Button, Grid, Stack } from "@mui/material";
import ParentCard from "@/app/components/shared/ParentCard";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import apiClient from "@/services/apiClient";
import AutoCompleteEvents from "@/app/components/awards/auto-complete/Auto-Input-Events";

const FotoForm = () => {
	const router = useRouter();

	// Desestruturando do hook de formulário do emblema
	const { formData, handleChange, handleSave, formErrors, success } =
		useFotoForm();
	const [imageFile, setImageFile] = useState(null);
	const [eventos, setEventos] = useState([]);
	const [loading, setLoading] = useState(false);

	// Função para carregar os eventos da API
	useEffect(() => {
		const fetchEventos = async () => {
			setLoading(true);
			try {
				const response = await apiClient.get("/api/eventos/");
				setEventos(response.data.results); // Armazena os eventos
			} catch (error) {
				console.error("Erro ao buscar eventos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEventos();
	}, []);

	// Função para lidar com a mudança da imagem
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImageFile(file);
		handleChange("imagem", file);
	};

	// Redirecionamento após sucesso
	if (success) {
		router.push("/awards/fotos");
	}

	return (
		<PageContainer
			title={"Cadastro de Fotos"}
			description={"Formulário para cadastro de novo Emblema"}
		>
			<Breadcrumb title="Criar Foto" />
			{success && (
				<Alert severity="success" sx={{ marginBottom: 3 }}>
					A foto foi cadastrada com sucesso!
				</Alert>
			)}
			<ParentCard title="Nova Foto">
				<Grid container spacing={3}>
					{/* Eventos */}
					<Grid item xs={12} sm={12} lg={6}>
						<CustomFormLabel htmlFor="address">Eventos</CustomFormLabel>
						<AutoCompleteEvents
							fullWidth
							onChange={(id) => {
								console.log("Evento selecionado com ID:", id);
								handleChange("evento", id);
							}}
							options={eventos}
							loading={loading}
							getOptionLabel={(option) => option.nome || ""}
							{...(formErrors.evento && {
								error: true,
								helperText: formErrors.evento,
							})}
						/>
					</Grid>

					{/* Imagem */}
					<Grid item xs={12}>
						<CustomFormLabel htmlFor="banner">Imagem</CustomFormLabel>
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

export default FotoForm;
