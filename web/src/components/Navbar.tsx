import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/core/dist';
import NextLink from 'next/link';
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';
import { log } from 'util';

interface NavbarProps {}

const Navbar = ({}: NavbarProps): JSX.Element => {
  const [{ data, fetching }] = useCurrentUserQuery();
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
    <Flex bg="tomato" p={4} ml="auto">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
