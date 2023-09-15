import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  registration_date: yup.date().nullable(),
  last_login: yup.date().nullable(),
  status: yup.string().nullable(),
  medication: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
