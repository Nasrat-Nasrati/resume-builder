/* eslint-disable perfectionist/sort-imports */
import type { IPlanItem } from 'src/types/plan';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

type Props = {
  row: IPlanItem;
  selected: boolean;
  editHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
  onUserUpdated: () => void;
};

export function PlanTableRow({
  row,
  selected,
  editHref,
  onSelectRow,
  onDeleteRow,
  onUserUpdated,
}: Props) {
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
        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Download
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

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `${row.id}-checkbox`, 'aria-label': `${row.id} checkbox` }}
          />
        </TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell>{row.planType}</TableCell>
        <TableCell>{row.description}</TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
