import type { ICompanyItem } from 'src/types/company';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

// Import company mock data options
import { 
  COMPANY_STATUS_OPTIONS, 
  COMPANY_SIZE_OPTIONS, 
  BUSINESS_TYPE_OPTIONS,
  _industries 
} from 'src/_mock/_company';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCompanySchemaType = zod.infer<typeof NewCompanySchema>;

export const NewCompanySchema = zod.object({
  // ==================== IDENTIFICATION ====================
  companyCode: zod.string().min(1, { message: 'Company code is required!' }),
  name: zod.string().min(1, { message: 'Company name is required!' }),

  // ==================== VISUAL IDENTITY ====================
  logo: schemaHelper.file({ message: 'Company logo is required!' }),
  coverImage: schemaHelper.file().optional(),

  // ==================== CONTACT INFORMATION ====================
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  alternatePhone: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }).optional(),
  website: zod.string().optional(),

  // ==================== LOCATION INFORMATION ====================
  address: zod.string().min(1, { message: 'Address is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'Country is required!' }), {
    message: 'Country is required!',
  }),
  timezone: zod.string().min(1, { message: 'Timezone is required!' }),

  // ==================== SOCIAL MEDIA ====================
  facebookUrl: zod.string().optional(),
  instagramUrl: zod.string().optional(),
  linkedinUrl: zod.string().optional(),
  youtubeUrl: zod.string().optional(),

  // ==================== KEY PERSONNEL ====================
  ceoName: zod.string().min(1, { message: 'CEO name is required!' }),
  contactPerson: zod.string().min(1, { message: 'Contact person is required!' }),
  contactPosition: zod.string().min(1, { message: 'Contact position is required!' }),
  salesContact: zod.string().min(1, { message: 'Sales contact is required!' }),
  technicalContact: zod.string().optional(),

  // ==================== BUSINESS INFORMATION ====================
  industry: zod.string().min(1, { message: 'Industry is required!' }),
  subIndustry: zod.string().optional(),
  companySize: zod.string().min(1, { message: 'Company size is required!' }),
  foundedYear: zod.number().optional(),
  businessType: zod.string().min(1, { message: 'Business type is required!' }),
  description: zod.string().optional(),
  missionStatement: zod.string().optional(),

  // ==================== SERVICES & OPERATIONS ====================
  services: zod.array(zod.string()).default([]),
  products: zod.array(zod.string()).default([]),
  targetMarket: zod.string().min(1, { message: 'Target market is required!' }),
  certifications: zod.array(zod.string()).default([]),
  paymentMethods: zod.array(zod.string()).default([]),

  // ==================== STATUS & METADATA ====================
  status: zod.string().min(1, { message: 'Status is required!' }),
  isVerified: zod.boolean(),
  tags: zod.array(zod.string()).default([]),
  notes: zod.string().optional(),
});

// ----------------------------------------------------------------------

type Props = {
  currentCompany?: ICompanyItem;
};

export function CompanyNewEditForm({ currentCompany }: Props) {
  const router = useRouter();

  const defaultValues: NewCompanySchemaType = {
    // IDENTIFICATION
    companyCode: '',
    name: '',

    // VISUAL IDENTITY
    logo: null,
    coverImage: null,

    // CONTACT INFORMATION
    email: '',
    phoneNumber: '',
    alternatePhone: '',
    website: '',

    // LOCATION INFORMATION
    address: '',
    city: '',
    state: '',
    country: '',
    timezone: 'America/New_York',

    // SOCIAL MEDIA
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',

    // KEY PERSONNEL
    ceoName: '',
    contactPerson: '',
    contactPosition: '',
    salesContact: '',
    technicalContact: '',

    // BUSINESS INFORMATION
    industry: '',
    subIndustry: '',
    companySize: '',
    foundedYear: undefined,
    businessType: '',
    description: '',
    missionStatement: '',

    // SERVICES & OPERATIONS
    services: [],
    products: [],
    targetMarket: '',
    certifications: [],
    paymentMethods: [],

    // STATUS & METADATA
    status: 'pending',
    isVerified: false,
    tags: [],
    notes: '',
  };

  const methods = useForm<NewCompanySchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewCompanySchema),
    defaultValues,
    values: currentCompany,
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentCompany ? 'Update success!' : 'Create success!');
      router.push(`${paths.dashboard.root}/company`);
      console.info('COMPANY DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentCompany && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'verified' && 'info') ||
                  (values.status === 'pending' && 'warning') ||
                  (values.status === 'suspended' && 'error') ||
                  (values.status === 'rejected' && 'error') ||
                  'default'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="logo"
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
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Cover Image
              </Typography>
              <Field.Upload
                name="coverImage"
                maxSize={3145728}
                helperText={
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentCompany && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'active' : 'inactive')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Active Status
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Toggle company active status
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Verified Company
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Mark company as verified
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentCompany && (
              <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="soft" color="error">
                  Delete Company
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Company Information
            </Typography>
            
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                mb: 4,
              }}
            >
              {/* IDENTIFICATION */}
              <Field.Text name="companyCode" label="Company Code/Tax ID" />
              <Field.Text name="name" label="Company Name" />

              {/* CONTACT INFORMATION */}
              <Field.Text name="email" label="Email Address" />
              <Field.Phone name="phoneNumber" label="Phone Number" />
              <Field.Phone name="alternatePhone" label="Alternate Phone" />
              <Field.Text name="website" label="Website URL" />

              {/* LOCATION INFORMATION */}
              <Field.Text name="address" label="Address" />
              <Field.Text name="city" label="City" />
              <Field.Text name="state" label="State/Region" />
              <Field.CountrySelect name="country" label="Country" />
              <Field.Text name="timezone" label="Timezone" />

      

              {/* BUSINESS INFORMATION */}
                  <Field.Select name="industry" label="Industry">
                    <option value="">Select Industry</option>
                    {_industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select name="companySize" label="Company Size">
                    <option value="">Select Company Size</option>
                    {COMPANY_SIZE_OPTIONS.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select name="businessType" label="Business Type">
                    <option value="">Select Business Type</option>
                    {BUSINESS_TYPE_OPTIONS.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Select name="status" label="Status">
                    <option value="">Select Status</option>
                    {COMPANY_STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Field.Select>


              {/* <Field.Select name="industry" label="Industry" options={_industries} />
              <Field.Select name="companySize" label="Company Size" options={COMPANY_SIZE_OPTIONS} />
              <Field.Select name="businessType" label="Business Type" options={BUSINESS_TYPE_OPTIONS} />
              <Field.Select name="status" label="Status" options={COMPANY_STATUS_OPTIONS} /> */}
            </Box>

            <Typography variant="h6" sx={{ mb: 3 }}>
              Key Personnel
            </Typography>
            
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                mb: 4,
              }}
            >
              <Field.Text name="ceoName" label="CEO Name" />
              <Field.Text name="contactPerson" label="Contact Person" />
              <Field.Text name="contactPosition" label="Contact Position" />
              <Field.Text name="salesContact" label="Sales Contact" />
              <Field.Text name="technicalContact" label="Technical Contact" />
            </Box>

            <Typography variant="h6" sx={{ mb: 3 }}>
              Business Details
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Field.Text name="subIndustry" label="Sub Industry" fullWidth sx={{ mb: 3 }} />
              <Field.Text name="targetMarket" label="Target Market" fullWidth sx={{ mb: 3 }} />
              <Field.Text name="missionStatement" label="Mission Statement" fullWidth multiline rows={3} sx={{ mb: 3 }} />
              <Field.Text name="description" label="Company Description" fullWidth multiline rows={4} />
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentCompany ? 'Edite Company' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}