import type { IUserItemListView } from 'src/types/user';

import { z as zod } from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { updateUser } from 'src/auth/context/jwt/user-action';

// ----------------------------------------------------------------------

export const UserQuickEditSchema = zod.object({
  firstname: zod.string().min(1, { message: 'Name is required!' }),
  lastname: zod.string().min(1, { message: 'Last Name is required!' }),
  username: zod.string().min(1, { message: 'User Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be valid!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  fathername: zod.string().min(1, { message: 'Father name is required!' }),
  nid: zod.string().min(1, { message: 'NID is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  status: zod.string().optional(),
});

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  currentUser?: IUserItemListView;
  onUserUpdated?: () => void;
};

export function UserQuickEditForm({ currentUser, open, onClose, onUserUpdated }: Props) {
  const defaultValues: UserQuickEditSchemaType = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phoneNumber: '',
    fathername: '',
    nid: '',
    status: '',
    role: '',
  };

  const methods = useForm<UserQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ✅ Prefill the form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      reset({
        firstname: currentUser.firstname || '',
        lastname: currentUser.lastname || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phone || '',
        fathername: currentUser.fathername || '',
        nid: currentUser.nid || '',
        role: currentUser.position || '',
        status: currentUser.isActive.toLowerCase(),
      });
    }
  }, [currentUser, reset]);

  // ✅ Handle form submit
  // const onSubmit = handleSubmit(async (data) => {
  //   const promise = new Promise((resolve) => setTimeout(resolve, 1000));

  //   try {
  //     reset();
  //     onClose();

  //     toast.promise(promise, {
  //       loading: 'Loading...',
  //       success: 'Update success!',
  //       error: 'Update error!',
  //     });

  //     await promise;

  //     console.info('DATA:', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentUser) return; // 👈 ensure it's defined
      const payload = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phone: data.phoneNumber,
        fathername: data.fathername,
        nid: data.nid,
        position: data.role,
        isActive: data.status === 'active',
      };

      const promise = updateUser(currentUser.id, payload);

      reset();
      onClose();

      // Show toast notifications
      toast.promise(promise, {
        loading: 'Updating user...',
        success: 'User updated successfully!',
        error: 'Failed to update user!',
      });

      await promise;
      onUserUpdated?.();
    } catch (error) {
      console.error(error);
    }
  });

  // ----------------------------------------------------------------------

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>Quick update</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="firstname" label="First Name" />
            <Field.Text name="lastname" label="Last Name" />
            <Field.Text name="username" label="User Name" />
            <Field.Text name="email" label="Email address" />
            <Field.Phone name="phoneNumber" label="Phone number" />
            <Field.Text name="fathername" label="Father name" />
            <Field.Text name="nid" label="NID" />
            <Field.Text name="role" label="Role / Position" />

            <Field.Select name="status" label="Status">
              {(currentUser?.isActive === 'Active'
                ? ['Active', 'Inactive']
                : ['Inactive', 'Active']
              ).map((status) => (
                <MenuItem key={status} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              ))}
            </Field.Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
