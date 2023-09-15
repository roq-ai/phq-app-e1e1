import * as yup from 'yup';

export const healthcareProviderValidationSchema = yup.object().shape({
  specialization: yup.string().nullable(),
  experience_years: yup.number().integer().nullable(),
  license_number: yup.string().nullable(),
  status: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
