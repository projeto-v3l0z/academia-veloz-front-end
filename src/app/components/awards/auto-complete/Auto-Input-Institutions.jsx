'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import instituteService from '@/services/instituteService';
import { debounce } from 'lodash';

export default function AutoCompleteInstitutions({ onChange, value, error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  useEffect(() => {
    const fetchDefaultInstitute = async () => {
      if (value) {
        try {
          const instituteValue = await instituteService.getInstitutionById(value);
          if (instituteValue) {
            setSelectedInstitute({
              id: instituteValue.id, 
              name: instituteValue.nome,
            });
          }
        } catch (error) {
          console.error('Erro ao buscar unidade pelo id:', error);
        }
      }
    };

    fetchDefaultInstitute();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedInstitute(newValue);
    if (newValue) {
      onChange(newValue.id);
    } else {
      onChange(null);
    }
  };

  const fetchInstitutionsByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await instituteService.getInstitutionByName(name);
        const formattedInstitutions = response.results.map(institute => ({
          id: institute.id,
          name: institute.nome,
        }));
        setOptions(formattedInstitutions);
      } catch (error) {
        console.error('Erro ao buscar unidades:', error);
      }
      setLoading(false);
    }, 300), 
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <div>
      <Autocomplete
        sx={{ width: '100%' }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name || ''}
        options={options}
        loading={loading}
        value={selectedInstitute}
        noOptionsText="Nenhuma unidade encontrada"
        onInputChange={(event, newInputValue) => {
          fetchInstitutionsByName(newInputValue);
        }}
        onChange={handleChange}
        renderInput={(params) => (
          <CustomTextField
            error={error}
            helperText={helperText}
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
