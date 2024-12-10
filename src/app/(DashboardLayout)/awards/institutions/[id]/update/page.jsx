'use client';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

/* MUI */
import {
  Alert,
  Button,
  Grid,
  Stack,
} from '@mui/material';

/* hooks */
import useInstitute from "@/hooks/institutions/useInstitute";
import useInstituteForm from "@/hooks/institutions/useInstituteForm";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import ParentCard from "@/app/components/shared/ParentCard";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

const InstitutionsUpdateForm = () => {
  const param = useParams();
  const router = useRouter();
  const { id } = param;
  
  const { loading, error, instituteData } = useInstitute(id);

  const {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success
  } = useInstituteForm(instituteData, id);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const handleRedirect = debounce(() => {
    router.push('/awards/institutions');
  }, 2000);

  if (success) {
    handleRedirect();
  }

  return (
    <PageContainer title={'Cadastro da Instituição'} description={'Formulário para cadastro de nova Instituição'}>
      <Breadcrumb title="Criar Instituição" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          A instituição foi cadastrada com sucesso!
        </Alert>
      )}
      <ParentCard title="Nova Instituição">
        <Grid container spacing={3}>
          {/* Nome da Instituição */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="name">Nome do Instituição</CustomFormLabel>
            <CustomTextField
              name="name"
              placeholder="ex: Universidade da Amazônia"
              variant="outlined"
              fullWidth
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              {...(formErrors.name && { error: true, helperText: formErrors.name })}
            />
          </Grid>

          {/* Endereço da Instituição */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="address">Endereço</CustomFormLabel>
            <CustomTextField
              name="address"
              placeholder="ex: Rua da Universidade, 123"
              variant="outlined"
              fullWidth
              value={formData.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              {...(formErrors.address && { error: true, helperText: formErrors.address })}
            />
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

export default InstitutionsUpdateForm;
