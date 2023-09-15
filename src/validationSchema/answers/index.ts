import * as yup from 'yup';

export const answerValidationSchema = yup.object().shape({
  answer_text: yup.string().required(),
  date_time: yup.date().nullable(),
  medication: yup.string().nullable(),
  status: yup.string().nullable(),
  question_id: yup.string().nullable().required(),
  guest_id: yup.string().nullable().required(),
});
