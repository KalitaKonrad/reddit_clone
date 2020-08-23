import { Box } from '@chakra-ui/core';
import React, { ReactNode } from 'react';

interface ContainerProps {
  variant?: 'small' | 'regular';
  children?: ReactNode | ReactNode[];
}

export const Container = ({ children, variant = 'regular' }: ContainerProps): JSX.Element => {
  return (
    <Box maxW={variant === 'regular' ? '800px' : '400px'} w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};
