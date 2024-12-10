'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  Box,
  Grid,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  AddBoxRounded,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Stack } from '@mui/system';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import ParentCard from '../../shared/ParentCard';
import eventService from '@/services/eventService';
import getDate from '@/utils/formatDate';
import { formatDate } from '@/utils/formatDateOut';

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return <CustomTextField {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

const EventsList = () => {
  const router = useRouter();

  // Dados da tabela
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  // Carrega os dados
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data.results);
      } catch (err) {
        setError(`Erro ao carregar eventos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Colunas da tabela
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('nome', {
      header: () => 'Nome do Evento',
      cell: (info) => (
        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('data', {
      header: () => 'Data do Evento',
      cell: (info) => (
        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
          {formatDate(info.getValue())}
        </Typography>
      ),
    }),
    columnHelper.accessor('instituicao', {
      header: () => 'Instituição',
      cell: (info) => (
        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
          {info.getValue().nome}
        </Typography>
      ),
    }),
    columnHelper.accessor('id', {
      header: () => 'Ações',
      enableSorting: false,
      cell: (info) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEditClick(info.getValue())}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteClick(info.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    }),
  ];

  const [columnFilters, setColumnFilters] = React.useState([]);
  const table = useReactTable({
    data: events,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const handleCreateClick = () => {
    router.push('/awards/events/create');
  };

  const handleEditClick = (eventId) => {
    router.push(`/awards/events/${eventId}/update`);
  };

  const handleDeleteClick = (eventId) => {
    setSelectedEvent(eventId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleDialogConfirm = async () => {
    try {
      await eventService.deleteEvent(selectedEvent);
      setEvents(events.filter((event) => event.id !== selectedEvent));
    } catch (error) {
      setError(`Erro ao excluir evento: ${error.message}`);
    } finally {
      handleDialogClose();
    }
  };

  return (
    <ParentCard title="Eventos">
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Button
            variant="outlined"
            startIcon={<AddBoxRounded />}
            sx={{ marginTop: 1, marginBottom: 2 }}
            onClick={handleCreateClick}
          >
            Adicionar Evento
          </Button>
          <Box>
            <TableContainer>
              <Table
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell key={header.id}>
                          <Typography
                            variant="h6"
                            mb={1}
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted()] ?? null}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Stack
              gap={1}
              p={3}
              alignItems="center"
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
            >
              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                  },
                }}
                alignItems="center"
                gap={1}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="body1">Página</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  | ir para:
                  <CustomTextField
                    type="number"
                    min="1"
                    max={table.getPageCount()}
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                    }}
                  />
                </Stack>
                <CustomSelect
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 15, 20, 25].map((pageSize) => (
                    <MenuItem key={pageSize} value={pageSize}>
                      {pageSize}
                    </MenuItem>
                  ))}
                </CustomSelect>

                <IconButton
                  size="small"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronsLeft />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronLeft />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronRight />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronsRight />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* Modal de confirmação de exclusão */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este Evento? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogConfirm} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </ParentCard>
  );
};

export default EventsList;
