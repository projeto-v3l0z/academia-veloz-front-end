'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { debounce } from 'lodash';
import courseService from '@/services/courseService';

export default function AutoCompleteCourses({ onChange, value, error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState('');

  useEffect(() => {
    const fetchDefaultCourses = async () => {
      console.log('teste', value);
      if (value) {
        try {
          const course = await courseService.getCourseById(value); // Atualizado para buscar aluno pelo id
          const formattedCourses = {
            id: course.id,
            name: course.nome, // Atualizado para usar o nome dos alunos
          };
          setSelectedCourses(formattedCourses);
        } catch (error) {
          console.error('Erro ao buscar Curso: ', error);
        }
      }
    };
    fetchDefaultCourses();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedCourses(newValue);
    onChange(newValue ? newValue.id : '');
  };

  const fetchCoursesByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await courseService.getCourseByName(name); // Atualizado para buscar alunos pelo nome
        const formattedCourses = response.results.map((courses) => ({
          id: courses.id,
          name: courses.nome, // Assumindo que o nome do aluno vem com a chave 'nome'
        }));
        console.log(formattedCourses);
        setOptions(formattedCourses);
      } catch (error) {
        console.error('Erro ao buscar Curso:', error);
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
        value={selectedCourses}
        noOptionsText="Nenhum Curso encontrado"
        onInputChange={(event, newInputValue) => {
          fetchCoursesByName(newInputValue); // Atualizado para buscar alunos
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
