import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface InitialValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  username: '',
  email: '',
  password: '',
};

const Register = (): JSX.Element => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Container variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });

          const errors = response.data?.register.errors;
          const user = response.data?.register.user;

          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <InputField name="username" label="Username" placeholder="Username" />
              <Box mt={4}>
                <InputField name="email" label="Email" placeholder="Email" />
              </Box>
              <Box mt={4}>
                <InputField name="password" label="Password" placeholder="Password" type="password" />
              </Box>
              <Box mt={4}>
                <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit" onSubmit={handleSubmit}>
                  Register
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
