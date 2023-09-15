import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAnswer } from 'apiSdk/answers';
import { answerValidationSchema } from 'validationSchema/answers';
import { Phq9QuestionInterface } from 'interfaces/phq-9-question';
import { GuestInterface } from 'interfaces/guest';
import { getPhq9Questions } from 'apiSdk/phq-9-questions';
import { getGuests } from 'apiSdk/guests';
import { AnswerInterface } from 'interfaces/answer';

function AnswerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AnswerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAnswer(values);
      resetForm();
      router.push('/answers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AnswerInterface>({
    initialValues: {
      answer_text: '',
      date_time: new Date(new Date().toDateString()),
      medication: '',
      status: '',
      question_id: (router.query.question_id as string) ?? null,
      guest_id: (router.query.guest_id as string) ?? null,
    },
    validationSchema: answerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Answers',
              link: '/answers',
            },
            {
              label: 'Create Answer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Answer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.answer_text}
            label={'Answer Text'}
            props={{
              name: 'answer_text',
              placeholder: 'Answer Text',
              value: formik.values?.answer_text,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_time ? new Date(formik.values?.date_time) : null}
              onChange={(value: Date) => formik.setFieldValue('date_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.medication}
            label={'Medication'}
            props={{
              name: 'medication',
              placeholder: 'Medication',
              value: formik.values?.medication,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<Phq9QuestionInterface>
            formik={formik}
            name={'question_id'}
            label={'Select Phq 9 Question'}
            placeholder={'Select Phq 9 Question'}
            fetcher={getPhq9Questions}
            labelField={'question_text'}
          />
          <AsyncSelect<GuestInterface>
            formik={formik}
            name={'guest_id'}
            label={'Select Guest'}
            placeholder={'Select Guest'}
            fetcher={getGuests}
            labelField={'status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/answers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'answer',
    operation: AccessOperationEnum.CREATE,
  }),
)(AnswerCreatePage);
