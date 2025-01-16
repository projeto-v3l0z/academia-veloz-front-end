'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { debounce } from 'lodash';
import userService from '@/services/userService';

export default function AutoCompleteAlunos({ onChange, value = [], error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState([]);

  useEffect(() => {
    const fetchDefaultAlunos = async () => {
      if (value.length > 0) {
        try {
          const alunos = await Promise.all(value.map((id) => userService.getUserById(id))); // Atualizado para buscar aluno pelo id
          const formattedAlunos = alunos.map((aluno) => ({
            id: aluno.id,
            name: aluno.username, // Atualizado para usar o nome dos alunos
            }));
          setSelectedAluno(formattedAlunos)
        } catch (error) {
          console.error('Erro ao buscar Alunos: ', error);
        }
      }
    };

    fetchDefaultAlunos();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedAluno(newValue);
    onChange(newValue.map((aluno) => Number(aluno.id)));
  };

  const fetchAlunosByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await userService.getUserByName(name); // Atualizado para buscar alunos pelo nome
        const formattedAlunos = response.results.map(aluno => ({
            id: aluno.id,
            name: aluno.username, // Assumindo que o nome do aluno vem com a chave 'nome'
            }));
        setOptions(formattedAlunos);
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
        value={selectedAluno}
        noOptionsText="Nenhum aluno encontrado"
        onInputChange={(event, newInputValue) => {
          fetchAlunosByName(newInputValue); // Atualizado para buscar alunos
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
