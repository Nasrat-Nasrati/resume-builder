import type { ISalesOfficeItem } from 'src/types/salesoffice';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'; // اضافه کردن import

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: ISalesOfficeItem;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: () => void;
  onEditRow: VoidFunction; // اضافه کردن این پراپ
  companyName?: string; // اضافه کردن این پراپ
  salesOfficeCount: number; // اضافه کردن این پراپ
  editHref: string;
  viewHref: string; // اضافه کردن این پراپ
};

export function SalesOfficeTableRow({ row, selected, editHref, viewHref, onSelectRow, onDeleteRow }: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  const statusColor = ((): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (String(row.status)) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      case 'closed':
        return 'error';
      case 'under-construction':
        return 'info';
      default:
        return 'default';
    }
  })();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{
              id: `${row.id}-checkbox`,
              'aria-label': `${row.id} checkbox`,
            }}
          />
        </TableCell>

        {/* Office Name */}
        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.name} src={row.logo} sx={{ bgcolor: 'primary.main' }}>
              {row.name.charAt(0)}
            </Avatar>
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link
                component={RouterLink}
                href={viewHref}
                color="inherit"
                sx={{ cursor: 'pointer' }}
              >
                {row.name}
              </Link>
              <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Box>
        </TableCell>

        {/* Phone */}
        <TableCell>
          {row.phoneNumber}
        </TableCell>

        {/* Manager */}
        <TableCell>
          {row.officeManagerName}
        </TableCell>

        {/* Company */}
        <TableCell>
          {row.companyName}
        </TableCell>

        {/* Status */}
        <TableCell>
          <Label variant="soft" color={statusColor}>
            {row.status}
          </Label>
        </TableCell>

        {/* Actions */}
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* More Actions Menu */}
            <IconButton
              color={menuActions.open ? 'inherit' : 'default'}
              onClick={menuActions.onOpen}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}