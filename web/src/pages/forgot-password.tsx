import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Text } from '@chakra-ui/core/dist';
import { InputField } from '../components/InputField';
import { Container } from '../components/Container';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword = ({}): JSX.Element => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Container variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          await forgotPassword({ email: values.email });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <Text>Email has been sent to that email address.</Text>
            </Box>
          ) : (
            <Form>
              <Flex direction="column">
                <Text textAlign="center">Forgot password</Text>
                <Box mt={4}>
                  <InputField name="email" label="Email" placeholder="Email" type="email" />
                </Box>
                <Box mt={4}>
                  <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit">
                    Reset password
                  </Button>
                </Box>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
