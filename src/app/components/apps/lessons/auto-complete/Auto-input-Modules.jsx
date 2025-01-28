'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { debounce } from 'lodash';
import moduleService from '@/services/moduleService';

export default function AutoCompleteModules({ onChange, value, error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModules, setSelectedModules] = useState('');

  useEffect(() => {
    const fetchDefaultModules = async () => {
      console.log('teste', value);
      if (value) {
        try {
          const module = await moduleService.getModuleById(value); // Atualizado para buscar aluno pelo id
          const formattedModules = {
            id: module.id,
            name: module.titulo, // Atualizado para usar o nome dos alunos
          };
          setSelectedModules(formattedModules);
        } catch (error) {
          console.error('Erro ao buscar Modulo: ', error);
        }
      }
    };
    fetchDefaultModules();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedModules(newValue);
    onChange(newValue ? newValue.id : '');
  };

  const fetchModulesByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await moduleService.getModuleByName(name); // Atualizado para buscar alunos pelo nome
        const formattedModules = response.results.map((modules) => ({
          id: modules.id,
          name: modules.titulo, // Assumindo que o nome do aluno vem com a chave 'nome'
        }));
        console.log(formattedModules);
        setOptions(formattedModules);
      } catch (error) {
        console.error('Erro ao buscar Modulo:', error);
      }
      setLoading(false);
    }, 300),
    [],
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
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name || ''}
        options={options}
        loading={loading}
        value={selectedModules}
        noOptionsText="Nenhum Modulo encontrado"
        onInputChange={(event, newInputValue) => {
          fetchModulesByName(newInputValue); // Atualizado para buscar alunos
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
