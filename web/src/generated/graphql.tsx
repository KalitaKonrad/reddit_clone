import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post?: Maybe<Post>;
  currentUser?: Maybe<User>;
};

export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
};

export type MutationCreatePostArgs = {
  input: PostInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ErrorFragment = { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>;

export type RegularUserFragment = { __typename?: 'User' } & Pick<User, 'id' | 'username'>;

export type UserResponseFFragment = { __typename?: 'UserResponse' } & {
  errors?: Maybe<Array<{ __typename?: 'FieldError' } & ErrorFragment>>;
  user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changePassword: { __typename?: 'UserResponse' } & UserResponseFFragment;
};

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost: { __typename?: 'Post' } & Pick<
    Post,
    'id' | 'title' | 'text' | 'points' | 'creatorId' | 'createdAt' | 'updatedAt'
  >;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & UserResponseFFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & UserResponseFFragment;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = { __typename?: 'Query' } & {
  posts: Array<{ __typename?: 'Post' } & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title'>>;
};

export const ErrorFragmentDoc = gql`
  fragment Error on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const UserResponseFFragmentDoc = gql`
  fragment UserResponseF on UserResponse {
    errors {
      ...Error
    }
    user {
      ...RegularUser
    }
  }
  ${ErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...UserResponseF
    }
  }
  ${UserResponseFFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
}
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      text
      points
      creatorId
      createdAt
      updatedAt
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...UserResponseF
    }
  }
  ${UserResponseFFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...UserResponseF
    }
  }
  ${UserResponseFFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
}
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      createdAt
      updatedAt
      title
    }
  }
`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
