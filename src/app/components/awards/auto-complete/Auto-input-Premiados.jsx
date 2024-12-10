'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import winnerService from '@/services/winnerService'; // Atualizado para usar winnerService
import { debounce } from 'lodash';

export default function AutoCompletePremiados({ onChange, value = [], error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPremiado, setSelectedPremiado] = useState([]);

  useEffect(() => {
    const fetchDefaultPremiados = async () => {
      if (value.length > 0) {
        try {
          const premiados = await Promise.all(value.map((id) => winnerService.getWinnerById(id))); // Atualizado para buscar premiado pelo id
          const formattedPremiados = premiados.map((premiado) => ({
            id: premiado.id,
            name: premiado.nome, // Atualizado para usar o nome dos premiados
          }));
          setSelectedPremiado(formattedPremiados);
        } catch (error) {
          console.error('Erro ao buscar premiados: ', error);
        }
      }
    };

    fetchDefaultPremiados();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedPremiado(newValue);
    onChange(newValue.map((premiado) => premiado.id));
  };

  const fetchPremiadosByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await winnerService.getWinnerByName(name); // Atualizado para buscar premiados pelo nome
        const formattedPremiados = response.results.map(premiado => ({
          id: premiado.id,
          name: premiado.nome, // Assumindo que o nome do premiado vem com a chave 'nome'
        }));
        setOptions(formattedPremiados);
      } catch (error) {
        console.error('Erro ao buscar premiados:', error);
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
        value={selectedPremiado}
        noOptionsText="Nenhum premiado encontrado"
        onInputChange={(event, newInputValue) => {
          fetchPremiadosByName(newInputValue); // Atualizado para buscar premiados
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
