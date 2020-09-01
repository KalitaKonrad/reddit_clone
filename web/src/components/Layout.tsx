import React from 'react';
import { Container, ContainerVariant } from './Container';
import Navbar from './Navbar';

interface LayoutProps {
  variant?: ContainerVariant;
  children?: any;
}

export const Layout = ({ children, variant }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container variant={variant}>{children}</Container>
    </>
  );
};
