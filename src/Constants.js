import { gql } from '@apollo/client';

export const TAB_BOTTOM_HEIGHT = 84;
export let CLIENT_JWT_TOKEN = '';
export let IS_CONNECTED = '';

export const GQL_CREATE_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      email
      password
    }
  }
`;

export const GQL_CONNECT_USER = gql`
  query Query($email: String, $password: String) {
    connectUser(email: $email, password: $password) {
      token
      email
    }
  }
`;
