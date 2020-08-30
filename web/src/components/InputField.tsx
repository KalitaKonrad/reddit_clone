import React, { InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/core/dist';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; textarea?: boolean };

export const InputField = ({ label, textarea, size, ...props }: InputFieldProps): JSX.Element => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {textarea ? <Textarea {...field} {...props} id={field.name} /> : <Input {...field} {...props} id={field.name} />}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
