import React from 'react';
import { Container } from '../components/Container';
import { Form, Formik } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/core/dist';
import { InputField } from '../components/InputField';

const CreatePost = () => {
  return (
    <Container variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
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
    </Container>
  );
};

export default CreatePost;
