import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { InputField } from '../../components/InputField';
import { Container } from '../../components/Container';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <Container variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <Box mt={4}>
                <InputField name="newPassword" label="New password" placeholder="New Password" type="password" />
              </Box>
              {tokenError && <Box color="red">{tokenError}</Box>}
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
