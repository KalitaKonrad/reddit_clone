import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/core/dist';
import NextLink from 'next/link';
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

const Navbar = ({}: NavbarProps): JSX.Element => {
  const [{ data, fetching }] = useCurrentUserQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
    // data is loading
  } else if (!data?.currentUser) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data?.currentUser.username}</Box>
        <Button variant="link" isLoading={logoutFetching} onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" position="sticky" top={0} zIndex={5} p={4} ml="auto">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
