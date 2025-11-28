/* eslint-disable perfectionist/sort-imports */

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { toast } from 'src/components/snackbar';

import type { IPlanItem } from 'src/types/plan';
import { createPlan, updatePlan } from 'src/auth/context/jwt/plan-action';

// ----------------------------------------------------------------------

export type PlanFormSchemaType = zod.infer<typeof PlanFormSchema>;

export const PlanFormSchema = zod.object({
  name: zod.string().min(1, { message: 'Plan name is required!' }),
  type: zod.string().min(1, { message: 'Plan type is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  file: schemaHelper.file({ message: 'File is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentPlan?: IPlanItem;
};

export function PlanNewEditForm({ currentPlan }: Props) {
  const router = useRouter();

  const defaultValues: PlanFormSchemaType = {
    name: '',
    type: '',
    description: '',
    file: null,
  };

  const methods = useForm<PlanFormSchemaType>({
    resolver: zodResolver(PlanFormSchema),
    defaultValues,
    values: currentPlan
      ? {
          name: currentPlan.name,
          type: currentPlan.planType,
          description: currentPlan.description,
          file: null,
        }
      : undefined,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        name: data.name,
        planType: data.type, // matches backend field
        description: data.description,
      };

      const file = Array.isArray(data.file) ? data.file[0] : (data.file as File | null);
      if (!file && !currentPlan) {
        toast.error('File is required for new plan!');
        return;
      }

      if (currentPlan) {
        // Update existing plan
        await updatePlan(currentPlan.id, payload, file);
        toast.success('Plan updated successfully!');
      } else {
        console.log('pay load is ', payload);
        // Create new plan
        await createPlan(payload, file);
        toast.success('Plan created successfully!');
      }

      reset();
      router.push(paths.dashboard.plan.root); // adjust path
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="name" label="Plan Name" />

            <Field.Select name="type" label="Plan Type">
              {['MASTER_PLAN', 'STRUCTURAL_PLAN', 'DETAILED_PLAN'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option.replace('_', ' ')}
                </MenuItem>
              ))}
            </Field.Select>
          </Box>

          <Field.Text
            name="description"
            label="Plan Description"
            multiline
            rows={4}
            sx={{ mt: 3 }}
          />

          <Box sx={{ mt: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Upload Plan File</Typography>
              <Field.Upload
                name="file"
                maxSize={5242880}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Allowed *.pdf, *.jpg, *.png, *.zip — Max size {fData(5242880)}
                  </Typography>
                }
              />
            </Stack>
          </Box>

          <Stack sx={{ mt: 4, alignItems: 'flex-end' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentPlan ? 'Save Changes' : 'Create Plan'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Form>
  );
}
