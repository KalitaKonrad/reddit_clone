import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/core/dist';
import { InputField } from '../../components/InputField';
import { Container } from '../../components/Container';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (tokenError) {
      onOpen();
    }
  }, [tokenError, onOpen]);

  return (
    <Container variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === 'string' ? router.query.token : '',
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
              <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Something went wrong</ModalHeader>
                  <ModalCloseButton onClick={() => onClose()} />
                  <ModalBody>
                    <Flex>
                      <Text mr={2}>{tokenError}</Text>
                      <NextLink href="/forgot-password">
                        <Link>Send reset link again</Link>
                      </NextLink>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => onClose()}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
