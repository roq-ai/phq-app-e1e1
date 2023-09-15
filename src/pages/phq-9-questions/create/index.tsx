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

import { createPhq9Question } from 'apiSdk/phq-9-questions';
import { phq9QuestionValidationSchema } from 'validationSchema/phq-9-questions';
import { GuestInterface } from 'interfaces/guest';
import { HealthcareProviderInterface } from 'interfaces/healthcare-provider';
import { getGuests } from 'apiSdk/guests';
import { getHealthcareProviders } from 'apiSdk/healthcare-providers';
import { Phq9QuestionInterface } from 'interfaces/phq-9-question';

function Phq9QuestionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: Phq9QuestionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPhq9Question(values);
      resetForm();
      router.push('/phq-9-questions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<Phq9QuestionInterface>({
    initialValues: {
      question_text: '',
      status: '',
      guest_id: (router.query.guest_id as string) ?? null,
      healthcare_provider_id: (router.query.healthcare_provider_id as string) ?? null,
    },
    validationSchema: phq9QuestionValidationSchema,
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
              label: 'Phq 9 Questions',
              link: '/phq-9-questions',
            },
            {
              label: 'Create Phq 9 Question',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Phq 9 Question
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.question_text}
            label={'Question Text'}
            props={{
              name: 'question_text',
              placeholder: 'Question Text',
              value: formik.values?.question_text,
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

          <AsyncSelect<GuestInterface>
            formik={formik}
            name={'guest_id'}
            label={'Select Guest'}
            placeholder={'Select Guest'}
            fetcher={getGuests}
            labelField={'status'}
          />
          <AsyncSelect<HealthcareProviderInterface>
            formik={formik}
            name={'healthcare_provider_id'}
            label={'Select Healthcare Provider'}
            placeholder={'Select Healthcare Provider'}
            fetcher={getHealthcareProviders}
            labelField={'specialization'}
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
              onClick={() => router.push('/phq-9-questions')}
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
    entity: 'phq_9_question',
    operation: AccessOperationEnum.CREATE,
  }),
)(Phq9QuestionCreatePage);
