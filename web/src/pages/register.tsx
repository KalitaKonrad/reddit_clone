import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { Box, Button, Flex } from '@chakra-ui/core/dist';

interface InitialValues {
  username: string;
  password: string;
}

const Register = (): JSX.Element => {
  const initialValues: InitialValues = {
    username: '',
    password: '',
  };

  return (
    <Container variant="small">
      <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <InputField name="username" label="Username" placeholder="Username" />
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

export default Register;
