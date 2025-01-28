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
} from '@mui/material';
import { AddBoxRounded, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
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
import LessonService from '@/services/lessonService';
import ModuleService from '@/services/moduleService';


function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta || {};

  return filterVariant === 'select' ? (
    <CustomSelect
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue ? columnFilterValue.toString() : ''}
    >
      {/* Exemplo de filtros dinâmicos, altere conforme o necessário */}
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Inactive">Inactive</MenuItem>
    </CustomSelect>
  ) : (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={columnFilterValue || ''}
    />
  );
}

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

const LessonsList = () => {
  const router = useRouter();

  // Dados da tabela
  const [lessonsList, setlessonsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Carrega os dados
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LessonService.getLessons();
        const modules = await ModuleService.getModules();

        if (data.results && modules.results) {
          const lessonsWithModules = data.results.map(lesson => {
            const relatedModule = modules.results.find(module => module.id === lesson.modulo);
            return {
              ...lesson,
              moduleInfo: relatedModule
            };
          });
          setlessonsList(lessonsWithModules);
        }
      } catch (err) {
        setError('Erro ao carregar aulas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(lessonsList);
  
  // Colunas da tabela
  const columnHelper = createColumnHelper();
  const columns = [

    columnHelper.accessor('moduleInfo.titulo', {
      header: () => 'Módulo',
      cell: (info) => {
        return (
          <Typography
            variant="subtitle1"
            color="textPrimary"
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {info.getValue()}
          </Typography>
        );
      },
    }),
    columnHelper.accessor('moduleInfo.curso.nome', {
      header: () => 'Curso',
      cell: (info) => {
        return (
          <Typography
            variant="subtitle1"
            color="textPrimary"
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {info.getValue()}
          </Typography>
        );
      },
    }),
    columnHelper.accessor('titulo', {
      header: () => 'título',
      cell: (info) => {
        return (
          <Typography
            variant="subtitle1"
            color="textPrimary"
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {info.getValue()}
          </Typography>
        );
      },
    }),
    columnHelper.accessor('tipo_conteudo', {
      header: () => 'Tipo de Conteúdo', // Alterado para nome de emblema
      cell: (info) => (
        <Typography
          variant="subtitle1"
          color="textPrimary"
          fontWeight={600}
          sx={{
            whiteSpace: 'nowrap',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('conteudo', {
      header: () => 'Conteúdo', // Alterado para nome de emblema
      cell: (info) => (
        <Typography
          variant="subtitle1"
          color="textPrimary"
          fontWeight={600}
          sx={{
            whiteSpace: 'nowrap',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
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
    data: lessonsList,
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
    router.push('/apps/lessons/create'); // Rota de criação de emblema
  };

  const handleEditClick = (id) => {
    router.push(`/apps/lessons/${id}/update`); // Rota de edição de emblema
  };

  const handleDeleteClick = async (id) => {
    // Excluir emblema
    try {
      await LessonService.deleteLesson(id);
      setlessonsList(lessonsList.filter((lesson) => lesson.id !== id));
    } catch (err) {
      setError('Erro ao excluir a aula');
    }
  };

  return (
    <ParentCard title="Aulas">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddBoxRounded />}
            sx={{ marginTop: 1, marginBottom: 2 }}
            onClick={handleCreateClick}
          >
            Adicionar Aula
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
    </ParentCard>
  );
};

export default LessonsList;
