import * as yup from 'yup';

export const phq9QuestionValidationSchema = yup.object().shape({
  question_text: yup.string().required(),
  status: yup.string().nullable(),
  guest_id: yup.string().nullable().required(),
  healthcare_provider_id: yup.string().nullable().required(),
});
