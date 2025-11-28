/* eslint-disable perfectionist/sort-imports */
import type { TableHeadCellProps } from 'src/components/table';

import type { IPlanItem, PlanType } from 'src/types/plan';

import { useState, useEffect, useCallback } from 'react';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

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
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { deletePlan, getAllPlans } from 'src/auth/context/jwt/plan-action';

import { PlanTableRow } from '../plan-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Name' },
  { id: 'planType', label: 'Plan Type' },
  { id: 'description', label: 'Description' },
  { id: 'actions', label: '' },
];

// ----------------------------------------------------------------------

export function PlanListView() {
  const table = useTable();
  const confirmDialog = useBoolean();

  const [tableData, setTableData] = useState<IPlanItem[]>([]);

  // Fetch plans
  const fetchPlans = useCallback(async () => {
    try {
      const data: IPlanItem[] = await getAllPlans();
      setTableData(
        data.map((plan) => ({
          id: plan.id,
          name: plan.name,
          planType: plan.planType as PlanType,
          description: plan.description,
          attachment: plan.attachment,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      toast.error('Failed to fetch plans.');
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const dataInPage = rowInPage(tableData, table.page, table.rowsPerPage);

  const notFound = tableData.length === 0;

  // Delete single row
  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await deletePlan(id);
        setTableData((prev) => prev.filter((row) => row.id !== id));
        table.onUpdatePageDeleteRow(dataInPage.length);
        toast.success('Plan deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete plan.');
      }
    },
    [dataInPage.length, table]
  );

  // Delete multiple rows
  const handleDeleteRows = useCallback(async () => {
    const selectedIds = table.selected;
    if (!selectedIds.length) return;

    try {
      await Promise.all(selectedIds.map((id) => deletePlan(id)));
      setTableData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
      table.onUpdatePageDeleteRows(dataInPage.length, tableData.length);
      toast.success(`${selectedIds.length} plan${selectedIds.length > 1 ? 's' : ''} deleted!`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete selected plans.');
    }
  }, [dataInPage.length, table, tableData]);

  // Confirm dialog
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
          heading="Plans List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Plan', href: paths.dashboard.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.plan.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Plan
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
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
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataInPage.map((row) => (
                    <PlanTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      editHref={paths.dashboard.plan.edit(row.id)}
                      onUserUpdated={fetchPlans}
                    />
                  ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 76}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={tableData.length}
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
