import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async values => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(),
          text: yup.string().required(),
        })}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Flex direction="column">
              <InputField name="title" label="Title" placeholder="Title" />
              <Box mt={4}>
                <InputField textarea name="text" label="Body" placeholder="text..." type="password" />
              </Box>
              <Box mt={4}>
                <Button isFullWidth isLoading={isSubmitting} variantColor="blue" type="submit" onSubmit={handleSubmit}>
                  Create Post
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
