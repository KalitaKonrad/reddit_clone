import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface InitialValues {
  username: string;
  password: string;
}

const initialValues: InitialValues = {
  username: '',
  password: '',
};

const Login = (): JSX.Element => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Container variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });

          const errors = response.data?.login.errors;
          const user = response.data?.login.user;

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
                <InputField name="password" label="Password" placeholder="Password" type="password" />
              </Box>
              <Box mt={4}>
                <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit" onSubmit={handleSubmit}>
                  Login
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
