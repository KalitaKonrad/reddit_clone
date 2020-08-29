import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { InputField } from '../../components/InputField';
import { Container } from '../../components/Container';
import React from 'react';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  // TODO: usePasswordMutation ?
  return (
    <Container variant="small">
      <Formik initialValues={{ newPassword: '' }} onSubmit={async (values, { setErrors }) => {}}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <Box mt={4}>
                <InputField name="newPassword" label="New password" placeholder="New Password" type="password" />
              </Box>
              <Box mt={4}>
                <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit" onSubmit={handleSubmit}>
                  Change password
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  // Nextjs function - allows to get any parameters passed to url
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
