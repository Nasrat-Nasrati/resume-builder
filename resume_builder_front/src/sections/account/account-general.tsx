import { z as zod } from 'zod';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { updateUser, getAllUsers } from 'src/auth/context/jwt/user-action';

// ----------------------------------------------------------------------

export const AccountSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: 'Avatar is required!' }),
  firstname: zod.string().min(1, { message: 'First name is required!' }),
  lastname: zod.string().min(1, { message: 'Last name is required!' }),
  fathername: zod.string().optional(),
  username: zod.string().min(1, { message: 'Username is required!' }),
  email: zod.string().email({ message: 'Invalid email!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  nid: zod.string().min(1, { message: 'NID is required!' }),
  role: zod.string().min(1, { message: 'Role/Position is required!' }),
  gender: zod.string().nullable(),
  dob: zod.string().nullable(),
  status: zod.enum(['active', 'inactive']),
});

export type AccountSchemaType = zod.infer<typeof AccountSchema>;

// ----------------------------------------------------------------------

export function AccountGeneral() {
  const { user: authUser } = useAuthContext();
  const { id } = authUser as { id: number };
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const foundUser = users.find((u: any) => String(u.id) === String(id));
        setCurrentUser(foundUser || null);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const defaultValues: AccountSchemaType = {
    avatarUrl: null,
    firstname: '',
    lastname: '',
    fathername: '',
    username: '',
    email: '',
    phoneNumber: '',
    nid: '',
    role: '',
    gender: 'male',
    dob: new Date().toISOString().split('T')[0],
    status: 'active',
  };

  const methods = useForm<AccountSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(AccountSchema),
    defaultValues,
    values: currentUser
      ? {
          avatarUrl: currentUser.profileImage || null,
          firstname: currentUser.firstname || '',
          lastname: currentUser.lastname || '',
          fathername: currentUser.fathername || '',
          username: currentUser.username || '',
          email: currentUser.email || '',
          phoneNumber: currentUser.phone || '',
          nid: currentUser.nid || '',
          role: currentUser.position || '',
          gender: currentUser.gender?.toLowerCase() || 'male',
          dob: currentUser.dob || new Date().toISOString().split('T')[0],
          status: currentUser.isActive ? 'active' : 'inactive',
        }
      : undefined,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        firstname: data.firstname,
        lastname: data.lastname,
        fathername: data.fathername,
        username: data.username,
        email: data.email,
        phone: data.phoneNumber,
        nid: data.nid,
        position: data.role,
        gender: data.gender ?? undefined,
        dob: data.dob ?? undefined,
        isActive: data.status === 'active',
      };

      let avatarFile: File | undefined;
      if (data.avatarUrl) {
        avatarFile = Array.isArray(data.avatarUrl) ? data.avatarUrl[0] : (data.avatarUrl as File);
      }

      if (currentUser) {
        const updatedUser = await updateUser(currentUser.id, payload, avatarFile);
        toast.success('Profile updated successfully!');

        reset({
          avatarUrl: currentUser.profileImage,
          firstname: updatedUser.firstname,
          lastname: updatedUser.lastname,
          fathername: updatedUser.fathername,
          username: updatedUser.username,
          email: updatedUser.email,
          phoneNumber: updatedUser.phone,
          nid: updatedUser.nid,
          role: updatedUser.position,
          gender: updatedUser.gender?.toLowerCase() || 'male',
          dob: updatedUser.dob || new Date().toISOString().split('T')[0],
          status: updatedUser.isActive ? 'active' : 'inactive',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  if (!currentUser) return <p>Loading user data...</p>;

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <Field.UploadAvatar
              name="avatarUrl"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <FormControlLabel
              labelPlacement="start"
              control={
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value === 'inactive'}
                      onChange={(event) =>
                        field.onChange(event.target.checked ? 'inactive' : 'active')
                      }
                    />
                  )}
                />
              }
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Banned
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disable account
                  </Typography>
                </>
              }
              sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="firstname" label="First name" />
              <Field.Text name="lastname" label="Last name" />
              <Field.Text name="fathername" label="Father name" />
              <Field.Text name="username" label="Username" />
              <Field.Text name="email" label="Email address" />
              <Field.Phone name="phoneNumber" label="Phone number" />
              <Field.Text name="nid" label="NID" />
              <Field.Text name="role" label="Role / Position" />
              <Field.Select name="gender" label="Gender">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <MenuItem key={gender} value={gender.toLowerCase()}>
                    {gender}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="dob" label="Date of Birth" type="date" />
              <Field.Select name="status" label="Status">
                {['Active', 'Inactive'].map((status) => (
                  <MenuItem key={status} value={status.toLowerCase()}>
                    {status}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
