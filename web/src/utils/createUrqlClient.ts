import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from '../generated/graphql';
import { helperUpdateQuery } from './helperUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            helperUpdateQuery<LogoutMutation, CurrentUserQuery>(cache, { query: CurrentUserDocument }, _result, () => ({
              currentUser: null,
            }));
          },
          login: (_result, args, cache, info) => {
            helperUpdateQuery<LoginMutation, CurrentUserQuery>(
              cache,
              { query: CurrentUserDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    currentUser: result.login.user,
                  };
                }
              },
            );
          },

          register: (_result, args, cache, info) => {
            helperUpdateQuery<RegisterMutation, CurrentUserQuery>(
              cache,
              { query: CurrentUserDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    currentUser: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
