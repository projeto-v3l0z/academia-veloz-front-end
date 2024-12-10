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
import winnerService from '@/services/winnerService';

const WinnersList = () => {
  const router = useRouter();

  // Dados da tabela
  const [listWinners, setListWinners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [winnerToDelete, setWinnerToDelete] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await winnerService.getWinners();
        setListWinners(data.results);
      } catch (err) {
        setError(`Erro ao carregar premiados`);
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
      header: () => 'Nome do Premiado',
      cell: (info) => (
        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('profissao', {
      header: () => 'Profissão',
      cell: (info) => (
        <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
          {info.getValue()}
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
    data: listWinners,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const handleCreateClick = () => {
    router.push('/awards/winners/create');
  };

  const handleEditClick = (id) => {
    router.push(`/awards/winners/${id}/update`);
  };

  const handleDeleteClick = (id) => {
    setWinnerToDelete(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setWinnerToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await winnerService.deleteWinner(winnerToDelete);
      setListWinners(listWinners.filter((item) => item.id !== winnerToDelete));
    } catch (err) {
      setError(`Erro ao excluir o premiado`);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <ParentCard title="Premiados">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddBoxRounded />}
            sx={{ marginTop: 1, marginBottom: 2 }}
            onClick={handleCreateClick}
          >
            Adicionar Premiado
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
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este premiado? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </ParentCard>
  );
};

export default WinnersList; // Renomeando para refletir a nova funcionalidade
