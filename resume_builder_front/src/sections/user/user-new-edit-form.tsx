import type { IUserItemListView } from 'src/types/user';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { updateUser, registerUser } from 'src/auth/context/jwt/user-action';

// ----------------------------------------------------------------------

export type UserFormSchemaType = zod.infer<typeof UserFormSchema>;

export const UserFormSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: 'Avatar is required!' }),
  firstname: zod.string().min(1, { message: 'First name is required!' }),
  lastname: zod.string().min(1, { message: 'Last name is required!' }),
  fathername: zod.string().optional(),
  username: zod.string().min(1, { message: 'Username is required!' }),
  password: zod.string().optional(),
  email: zod.string().email({ message: 'Invalid email!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  nid: zod.string().min(1, { message: 'NID is required!' }),
  role: zod.string().min(1, { message: 'Role/Position is required!' }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  dob: zod.string().min(1, { message: 'Date of birth is required!' }),
  status: zod.enum(['active', 'inactive']),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItemListView;
};

export function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const defaultValues: UserFormSchemaType = {
    avatarUrl: null,
    firstname: '',
    lastname: '',
    fathername: '',
    password: '',
    username: '',
    email: '',
    phoneNumber: '',
    nid: '',
    role: '',
    gender: 'male',
    dob: new Date().toISOString().split('T')[0],
    status: 'active',
  };

  const methods = useForm<UserFormSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(UserFormSchema),
    defaultValues,
    values: currentUser
      ? {
          avatarUrl: currentUser.profileImage || null,
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          fathername: currentUser.fathername,
          username: currentUser.username || currentUser.firstname,
          email: currentUser.email,
          phoneNumber: currentUser.phone,
          nid: currentUser.nid,
          role: currentUser.position,
          password: '',
          gender: currentUser.gender?.toLowerCase() || 'male',
          dob: currentUser.dob || new Date().toISOString().split('T')[0],
          status: currentUser.isActive ? 'active' : 'inactive',
        }
      : undefined,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
        gender: data.gender,
        dob: data.dob,
        isActive: data.status === 'active',
        ...(data.password ? { password: data.password } : {}),
      };

      let avatarFile: File | undefined;
      if (data.avatarUrl) {
        avatarFile = Array.isArray(data.avatarUrl) ? data.avatarUrl[0] : (data.avatarUrl as File);
      }

      if (currentUser) {
        await updateUser(currentUser.id, payload, avatarFile);
        toast.success('User updated successfully!');
      } else {
        await registerUser(payload, avatarFile);
        toast.success('User created successfully!');
      }

      reset();
      router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* Avatar and Status Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
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
                    <br />
                    max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
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
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
          </Card>
        </Grid>

        {/* Form fields */}
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
              <Field.Text
                name="password"
                label={currentUser ? 'New Password (optional)' : 'Password'}
                type="password"
              />
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
                {currentUser ? 'Save changes' : 'Create user'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
