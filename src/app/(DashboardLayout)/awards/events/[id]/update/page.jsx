'use client';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";

/* MUI */
import {
  Alert,
  Button,
  Grid,
  Stack,
} from '@mui/material';

/* hooks */
import useEvent from '@/hooks/events/useEvent';
import useEventForm from "@/hooks/events/useEventForm";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import ParentCard from "@/app/components/shared/ParentCard";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import FormDate from '@/app/components/forms/form-custom/FormDate';
import AutoCompleteInstitutions from '@/app/components/awards/auto-complete/Auto-Input-Institutions';
import { debounce } from 'lodash';
import AutoCompletePremiados from '@/app/components/awards/auto-complete/Auto-input-Premiados';

const EventUpdateForm = () => {
  const router = useRouter();
  const param = useParams();
  const { id } = param;

  const { loading, error, eventData } = useEvent(id);

  const {
    formData,
    handleChange,
    handleSave,
    formErrors,
    success,
  } = useEventForm(eventData, id);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const handleRedirect = debounce(() => {
    router.push('/awards/events');
  }, 2000);

  if (success) {
    handleRedirect();
  }

  return (
    <PageContainer title={'Edição de Evento'} description={'Formulário para edição de Evento'}>
      <Breadcrumb title="Editar Evento" />
      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          O evento foi atualizado com sucesso!
        </Alert>
      )}
      <ParentCard title="Evento">
        <Grid container spacing={3}>
          {/* Nome do Evento */}
          <Grid item xs={12} sm={12} lg={6}>
            <CustomFormLabel htmlFor="nome">Nome do Evento</CustomFormLabel>
            <CustomTextField
              name="nome"
              placeholder="ex: Evento da Universidade da Amazônia"
              variant="outlined"
              fullWidth
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              {...(formErrors.nome && { error: true, helperText: formErrors.nome })}
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

          {/* Descrição do Evento */}
          <Grid item xs={12} sm={12}>
            <CustomFormLabel htmlFor="descricao">Descrição do Evento</CustomFormLabel>
            <CustomTextField
              name="descricao"
              placeholder="ex: Evento de premiação dos melhores alunos"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              {...(formErrors.descricao && { error: true, helperText: formErrors.descricao })}
            />
          </Grid>

          {/* Data de Início */}
          <Grid item xs={12} sm={12} lg={6}>
            <FormDate
              label="Data de Início"
              name="data"
              value={formData.data}
              onChange={(newValue) => handleChange('data', newValue)}
              {...(formErrors.data && { error: true, helperText: formErrors.data })}
            />
          </Grid>

          {/* Premiados */}
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormLabel htmlFor="premiados">Premiados</CustomFormLabel>
            <AutoCompletePremiados
              fullWidth
              value={formData.premiados}
              onChange={(ids) => handleChange('premiados', ids)}
              {...(formErrors.premiados && { error: true, helperText: formErrors.premiados })}
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

export default EventUpdateForm;
