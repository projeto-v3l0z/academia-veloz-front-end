'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import emblemService from '@/services/emblemService'; // Atualizado para usar emblemService
import { debounce } from 'lodash';

export default function AutoCompleteEmblems({ onChange, value = [], error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmblem, setSelectedEmblem] = useState([]);

  useEffect(() => {
    const fetchDefaultEmblem = async () => {
      if (value.length > 0) {
        try {
          const emblems = await Promise.all(value.map((id) => emblemService.getEmblemById(id))); // Atualizado para buscar emblema pelo id
          const formattedEmblems = emblems.map((emblem) => ({
            id: emblem.id,
            name: emblem.nome, // Atualizado para usar o nome dos emblemas
          }));
          selectedEmblem(formattedEmblems);
        } catch (error) {
          console.error('Erro ao buscar emblemas: ', error);
        }
      }
    };

    fetchDefaultEmblem();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedEmblem(newValue);
    onChange(newValue.map((emblem) => emblem.id));
  };

  const fetchEmblemsByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await emblemService.getEmblemByName(name); // Atualizado para buscar emblemas pelo nome
        const formattedEmblems = response.results.map(emblem => ({
          id: emblem.id,
          name: emblem.nome, // Assumindo que o nome do emblema vem com a chave 'nome'
        }));
        setOptions(formattedEmblems);
      } catch (error) {
        console.error('Erro ao buscar emblemas:', error);
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
        multiple
        sx={{ width: '100%' }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name || ''}
        options={options}
        loading={loading}
        value={selectedEmblem}
        noOptionsText="Nenhum emblema encontrado"
        onInputChange={(event, newInputValue) => {
          fetchEmblemsByName(newInputValue); // Atualizado para buscar emblemas
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
