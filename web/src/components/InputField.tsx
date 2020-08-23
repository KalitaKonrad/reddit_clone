import React, { InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core/dist';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string };

export const InputField = ({ label, ...props }: InputFieldProps): JSX.Element => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
