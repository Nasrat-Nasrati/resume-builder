import { useParams } from 'react-router';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useCallback, ChangeEvent, useMemo } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _companyList } from 'src/_mock/_company';
import { _salesOfficeList } from 'src/_mock/sales_office';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useTable, getComparator, TableHeadCustom, TableSelectedAction, TableEmptyRows, emptyRows, TableNoData } from 'src/components/table';

import { ISalesOfficeItem } from 'src/types/salesoffice';

import { SalesOfficeTableRow } from './sales-office-table-row';
import { SalesOfficeTableToolbar } from './sales-office-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Office Name', width: 220 },
  { id: 'phone', label: 'Phone', width: 140 },
  { id: 'manager', label: 'Manager', width: 160 },
  { id: 'company', label: 'Company', width: 160 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'action', label: 'Action', width: 88 },
];

// ----------------------------------------------------------------------

export function SalesOfficeList() {
  const { id: companyId } = useParams();
  const table = useTable();
  const [tableData, setTableData] = useState(_salesOfficeList);
  const confirmDialog = useBoolean();
  const [filterName, setFilterName] = useState('');

  // Get company name for display
  const company = _companyList.find(comp => comp.id === companyId);

  // Filter sales offices based on company ID from URL
  const companySalesOffices = useMemo(() => {
    if (!companyId) return _salesOfficeList;
    
    return _salesOfficeList.filter(office => {
      const matchesById = office.companyId === companyId;
      const matchesByName = office.companyName === company?.name;
      
      // Normalize IDs for comparison (handle dash/underscore differences)
      const normalizedCompanyId = companyId?.replace('-', '_');
      const normalizedOfficeCompanyId = office.companyId?.replace('-', '_');
      const matchesByNormalizedId = normalizedOfficeCompanyId === normalizedCompanyId;
      
      return matchesById || matchesByName || matchesByNormalizedId;
    });
  }, [companyId, company?.name]);

  const dataFiltered = applyFilter({
    inputData: companySalesOffices, // Use filtered sales offices instead of all sales offices
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !!filterName;
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    table.setPage(0); // Reset to first page when filtering
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setTableData(deleteRow);
    table.onUpdatePageDeleteRow(dataInPage.length);
  };

  const handleDeleteRows = () => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);
    
    // Reset selection
    table.onSelectAllRows(false, []);
  };

  const handleEditRow = (id: string) => {
    // Handle edit logic
    console.log('Edit sales office:', id);
  };

  return (
    <>
      <Box sx={{ px: 2.5, pb: 3 }}>
        <SalesOfficeTableToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
          canReset={canReset}
          companyName={company?.name}
          salesOfficeCount={companySalesOffices.length}
        />
      </Box>

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                  <SalesOfficeTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    editHref={companyId ? paths.dashboard.company.salesOffice.edit(companyId, row.id) : `#`}
                    viewHref={companyId ? paths.dashboard.company.salesOffice.details(companyId, row.id) : `#`} salesOfficeCount={0}                  />
                ))}

              <TableEmptyRows
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePagination
        page={table.page}
        component="div"
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
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
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: ISalesOfficeItem[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (office) =>
        office.name?.toLowerCase().includes(filterName.toLowerCase()) ||
        office.email?.toLowerCase().includes(filterName.toLowerCase()) ||
        office.officeManagerName?.toLowerCase().includes(filterName.toLowerCase()) ||
        office.phoneNumber?.toLowerCase().includes(filterName.toLowerCase()) ||
        office.city?.toLowerCase().includes(filterName.toLowerCase()) ||
        office.state?.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  return inputData;
}