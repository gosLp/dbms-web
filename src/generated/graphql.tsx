import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Contract = {
  __typename?: 'Contract';
  contract_id: Scalars['Int'];
  duration: Scalars['String'];
  status: Scalars['Boolean'];
  type: Scalars['String'];
  value: Scalars['Float'];
};

export type ContractResponse = {
  __typename?: 'ContractResponse';
  TypeContract?: Maybe<Array<TypeField>>;
  contract?: Maybe<Contract>;
  errors?: Maybe<Array<FError>>;
};

/** which employee contract type, EX: Driver Contract or Mechanic */
export enum ContractType {
  Driver = 'DRIVER',
  Engineer = 'ENGINEER',
  Mangaement = 'MANGAEMENT',
  Mechanic = 'MECHANIC'
}

export type Contractdetails = {
  duration: Scalars['String'];
  type: ContractType;
  value: Scalars['Float'];
};

export type Driver = {
  __typename?: 'Driver';
  Dage: Scalars['Int'];
  Dname: Scalars['String'];
  driver_id: Scalars['Int'];
  pos: Scalars['Int'];
  status: Scalars['String'];
};

export type FError = {
  __typename?: 'FError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: ContractResponse;
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  newDriver: Driver;
  register: UserResponse;
  updateUser?: Maybe<Login>;
};


export type MutationCreateContractArgs = {
  options: Contractdetails;
  typeId?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteUserArgs = {
  uname: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  password: Scalars['String'];
  uname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  drivers: Array<Driver>;
  hello: Scalars['String'];
  me?: Maybe<Login>;
  users: Array<Login>;
};


export type QueryDriversArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type TypeField = {
  __typename?: 'TypeField';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Login>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Login = {
  __typename?: 'login';
  id: Scalars['Int'];
  uname: Scalars['String'];
};

export type CreateContractMutationVariables = Exact<{
  typeId?: InputMaybe<Scalars['Int']>;
  options: Contractdetails;
}>;


export type CreateContractMutation = { __typename?: 'Mutation', createContract: { __typename?: 'ContractResponse', contract?: { __typename?: 'Contract', contract_id: number, duration: string, status: boolean, type: string, value: number } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined, TypeContract?: Array<{ __typename?: 'TypeField', message: string, type: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'login', id: number, uname: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'login', id: number, uname: string } | null | undefined } };

export type DriversQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type DriversQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', Dage: number, Dname: string, driver_id: number, pos: number, status: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'login', id: number, uname: string } | null | undefined };


export const CreateContractDocument = gql`
    mutation CreateContract($typeId: Int, $options: Contractdetails!) {
  createContract(typeId: $typeId, options: $options) {
    contract {
      contract_id
      duration
      status
      type
      value
    }
    errors {
      field
      message
    }
    TypeContract {
      message
      type
    }
  }
}
    `;

export function useCreateContractMutation() {
  return Urql.useMutation<CreateContractMutation, CreateContractMutationVariables>(CreateContractDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      uname
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      uname
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const DriversDocument = gql`
    query Drivers($limit: Int!, $cursor: Int) {
  drivers(limit: $limit, cursor: $cursor) {
    Dage
    Dname
    driver_id
    pos
    status
  }
}
    `;

export function useDriversQuery(options: Omit<Urql.UseQueryArgs<DriversQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DriversQuery>({ query: DriversDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    uname
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};