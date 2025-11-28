import type { TableHeadCellProps } from 'src/components/table';
import type { ICompanyItem, ICompanyTableFilters } from 'src/types/company';

import { varAlpha } from 'minimal-shared/utils';
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ✅ اضافه شد: برای خواندن از بک‌اند
import apiClient from 'src/api/apiClient';
import { COMPANIES_ENDPOINT } from 'src/config/api';
import { DashboardContent } from 'src/layouts/dashboard';
import { _industries, COMPANY_STATUS_OPTIONS } from 'src/_mock/_company';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { CompanyTableRow } from '../company-table-row';
import { CompanyTableToolbar } from '../company-table-toolbar';
import { CompanyTableFiltersResult } from '../company-table-filters-result';

// ----------------------------------------------------------------------

// Custom useBoolean hook
const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onTrue = useCallback(() => setValue(true), []);
  const onFalse = useCallback(() => setValue(false), []);
  const onToggle = useCallback(() => setValue((prev) => !prev), []);

  return {
    value,
    setValue,
    onTrue,
    onFalse,
    onToggle,
  };
};

// Custom useSetState hook
const useSetState = <T extends object>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((newState: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  return {
    state,
    setState: setMergeState,
    resetState,
    setField,
  };
};

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...COMPANY_STATUS_OPTIONS];

// Company status types - UPDATED to include all statuses from mock data
type CompanyStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'verified' | 'rejected';
type StatusFilterValue = 'all' | CompanyStatus;

// FIX: Update table headers to match actual company data structure and CompanyTableRow
const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Company Name' },
  { id: 'phoneNumber', label: 'Phone', width: 150 },
  { id: 'industry', label: 'Industry', width: 140 },
  { id: 'companySize', label: 'Size', width: 120 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'actions', label: 'Actions', width: 88 },
];

// ----------------------------------------------------------------------

export function CompanyListView() {
  const table = useTable();

  const confirmDialog = useBoolean();

  // ✅ حالا دیگه از mock استفاده نمی‌کنیم؛ شروع با آرایه خالی
  const [tableData, setTableData] = useState<ICompanyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filters = useSetState<ICompanyTableFilters>({
    name: '',
    industry: [],
    status: 'all',
    companySize: [],
    country: [],
  });

  const { state: currentFilters, setState: updateFilters } = filters;

  // ✅ گرفتن دیتا از backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await apiClient.get<ICompanyItem[]>(COMPANIES_ENDPOINT);
        setTableData(res.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
        toast.error('Failed to load companies from server');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name || currentFilters.industry.length > 0 || currentFilters.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  // Fixed function with company status type
  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: StatusFilterValue) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {table.selected.length} </strong> companies?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Company List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Company' },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={`${paths.dashboard.root}/company/new`}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Company
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={currentFilters.status}
            onChange={handleFilterStatus}
            sx={[
              (theme) => ({
                px: 2.5,
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(
                  theme.vars.palette.grey['500Channel'],
                  0.08
                )}`,
              }),
            ]}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'suspended' && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all'
                      ? tableData.length
                      : tableData.filter((company) => company.status === tab.value).length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <CompanyTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ industries: _industries.map((i) => i.value) }}
          />

          {canReset && (
            <CompanyTableFiltersResult
              filters={filters as any}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirmDialog.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => {
                      // Debug log for each row
                      console.log(`Row ${index}:`, row);
                      console.log('Row status:', row.status, 'Type:', typeof row.status);
                      console.log('Row ID:', row.id);

                      return (
                        <CompanyTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          editHref={`${paths.dashboard.root}/company/${row.id}/edit`}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage} // ✅ متد درست
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ICompanyItem[];
  filters: ICompanyTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { name, status, industry } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((company) =>
      company.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((company) => company.status === status);
  }

  if (industry.length) {
    inputData = inputData.filter((company) => industry.includes(company.industry));
  }

  return inputData;
}
