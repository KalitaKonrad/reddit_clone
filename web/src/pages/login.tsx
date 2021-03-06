import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { Box, Button, Checkbox, Flex, Link } from '@chakra-ui/core/dist';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { Layout } from '../components/Layout';

interface InitialValues {
  usernameOrEmail: string;
  password: string;
}

const initialValues: InitialValues = {
  usernameOrEmail: '',
  password: '',
};

const Login = (): JSX.Element => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          const errors = response.data?.login.errors;
          const user = response.data?.login.user;

          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <InputField name="usernameOrEmail" label="Username or Email" placeholder="Username or email" />
              <Box mt={4}>
                <InputField name="password" label="Password" placeholder="Password" type="password" />
              </Box>
              <Flex mt={2}>
                <Box ml="auto">
                  <NextLink href="forgot-password">
                    <Link>Forgot password?</Link>
                  </NextLink>
                </Box>
              </Flex>
              <Box mt={4}>
                <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit" onSubmit={handleSubmit}>
                  Login
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
