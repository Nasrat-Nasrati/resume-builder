import type { TableHeadCellProps } from 'src/components/table';
import type { IUserAPI, UserStatus, IUserItemListView, IUserTableFilters } from 'src/types/user';

import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

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

import { _roles } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

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

import { deleteUser, getAllUsers } from 'src/auth/context/jwt/user-action';

import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { UserTableFiltersResult } from '../user-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: 'all' | UserStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'checkbox', label: '', width: 48 }, // for checkbox column
  // { id: 'name', label: 'Name' },
  // { id: 'fathername', label: 'Father Name' },
  { id: 'username', label: 'Username' },
  { id: 'nid', label: 'NID' },
  { id: 'gender', label: 'Gender', width: 100 },
  { id: 'phone', label: 'Phone', width: 160 },
  { id: 'position', label: 'Position', width: 180 },
  // { id: 'dob', label: 'Date of Birth', width: 120 },
  { id: 'status', label: 'Status', width: 100 },
  { id: 'actions', label: '', width: 88 },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const table = useTable();
  const confirmDialog = useBoolean();

  const [tableData, setTableData] = useState<IUserItemListView[]>([]);

  const filters = useSetState<IUserTableFilters>({
    name: '',
    role: [],
    status: 'all',
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  // Fetch and map users
  const fetchUser = useCallback(async () => {
    try {
      const data: IUserAPI[] = await getAllUsers();
      const mappedData: IUserItemListView[] = data.map((user) => ({
        id: user.id.toString(),
        firstname: user.firstname,
        lastname: user.lastname,
        fathername: user.fathername,
        username: user.username,
        email: user.email,
        phone: user.phone,
        position: user.position,
        gender: user.gender,
        dob: user.dob,
        profileImage: user.profileImage,
        isActive: user.isActive ? 'Active' : 'Inactive',
        nid: user.nid,
      }));
      setTableData(mappedData);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name || currentFilters.role.length > 0 || currentFilters.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // Delete single row
  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await deleteUser(id); // call backend
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);
        table.onUpdatePageDeleteRow(dataInPage.length);
        toast.success('User deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete user.');
      }
    },
    [dataInPage.length, table, tableData]
  );

  // Delete multiple rows
  const handleDeleteRows = useCallback(async () => {
    const selectedIds = table.selected;
    if (selectedIds.length === 0) return;

    try {
      await Promise.all(selectedIds.map((id) => deleteUser(id))); // call backend
      const updatedData = tableData.filter((row) => !selectedIds.includes(row.id));
      setTableData(updatedData);
      table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
      toast.success(`${selectedIds.length} user${selectedIds.length > 1 ? 's' : ''} deleted!`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete selected users.');
    }
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  // Filter by status tab
  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: 'all' | UserStatus) => {
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
          Are you sure you want to delete <strong>{table.selected.length}</strong> items?
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
          heading="User List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User', href: paths.dashboard.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New user
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
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }),
            ]}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      tab.value === 'Active'
                        ? 'success'
                        : tab.value === 'Inactive'
                          ? 'error'
                          : 'default'
                    }
                  >
                    {tab.value === 'all'
                      ? tableData.length
                      : tableData.filter((u) => u.isActive === tab.value).length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
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
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        editHref={paths.dashboard.user.edit(row.id)}
                        onUserUpdated={fetchUser}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 76}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
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
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IUserItemListView[];
  filters: IUserTableFilters;
  comparator: (a: IUserItemListView, b: IUserItemListView) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) =>
        user.firstname.toLowerCase().includes(name.toLowerCase()) ||
        user.lastname.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.isActive === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.position));
  }

  return inputData;
}
