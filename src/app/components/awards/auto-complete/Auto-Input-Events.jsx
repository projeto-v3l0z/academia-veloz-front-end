'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import eventService from '@/services/eventService'; // Atualizado para usar eventService
import { debounce } from 'lodash';

export default function AutoCompleteEvents({ onChange, value, error, helperText }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchDefaultEvent = async () => {
      if (value) {
        try {
          const eventValue = await eventService.getEventById(value); // Atualizado para buscar eventos pelo ID
          if (eventValue) {
            setSelectedEvent({
              id: eventValue.id, 
              name: eventValue.nome, // Atualizado para usar o nome de eventos
            });
          }
        } catch (error) {
          console.error('Erro ao buscar evento pelo id:', error);
        }
      }
    };

    fetchDefaultEvent();
  }, [value]);

  const handleChange = (event, newValue) => {
    setSelectedEvent(newValue);
    if (newValue) {
      onChange(newValue.id);
    } else {
      onChange(null);
    }
  };

  const fetchEventsByName = useCallback(
    debounce(async (name) => {
      if (!name) return;
      setLoading(true);
      try {
        const response = await eventService.getEventByName(name);
        const formattedEvents = response.results.map(event => ({
          id: event.id,
          name: event.nome,
        }));
        setOptions(formattedEvents);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
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
        value={selectedEvent}
        noOptionsText="Nenhum evento encontrado"
        onInputChange={(event, newInputValue) => {
          fetchEventsByName(newInputValue);
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
