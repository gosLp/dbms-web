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

export type Car = {
  __typename?: 'Car';
  E_condition: Scalars['String'];
  car_id: Scalars['Int'];
  chasis: Scalars['String'];
  driver: Driver;
  driverId: Scalars['Float'];
  engineSupplier: Scalars['String'];
  front: Scalars['String'];
  isActiveCar: Scalars['Boolean'];
  rear: Scalars['String'];
};

export type CarResponse = {
  __typename?: 'CarResponse';
  car?: Maybe<Car>;
  errors?: Maybe<Array<FError>>;
};

export type ConditionResponse = {
  __typename?: 'ConditionResponse';
  condition?: Maybe<Array<ConditonType>>;
  errors?: Maybe<Array<FError>>;
};

export type ConditonType = {
  __typename?: 'ConditonType';
  condition: EngineParts;
  part: Scalars['String'];
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

export type DriverDetailsResponse = {
  __typename?: 'DriverDetailsResponse';
  contract?: Maybe<Contract>;
  driver?: Maybe<Driver>;
  engineer?: Maybe<Engineer>;
  errors?: Maybe<Array<FError>>;
};

/** Age of the parts in the car */
export enum EngineParts {
  New = 'NEW',
  Old = 'OLD',
  Used = 'USED'
}

export type Engineer = {
  __typename?: 'Engineer';
  Eage: Scalars['Int'];
  Ename: Scalars['String'];
  engineer_id: Scalars['Int'];
  status: Scalars['Boolean'];
};

export type EngineerDetailsResponse = {
  __typename?: 'EngineerDetailsResponse';
  contract?: Maybe<Contract>;
  engineer?: Maybe<Engineer>;
  errors?: Maybe<Array<FError>>;
};

export type EngineerInput = {
  age: Scalars['Int'];
  name: Scalars['String'];
};

export type EngineerResponse = {
  __typename?: 'EngineerResponse';
  engineer?: Maybe<Engineer>;
  errors?: Maybe<Array<FError>>;
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

export type Mechanic = {
  __typename?: 'Mechanic';
  Mname: Scalars['String'];
  mech_id: Scalars['Int'];
  part: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: ContractResponse;
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  newDriver: CarResponse;
  newEngineer: EngineerResponse;
  newSponsor: SponsorResponse;
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


export type MutationNewDriverArgs = {
  driver_id: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationNewEngineerArgs = {
  options: EngineerInput;
};


export type MutationNewSponsorArgs = {
  carId?: InputMaybe<Scalars['Int']>;
  options: SponsorInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  password: Scalars['String'];
  uname: Scalars['String'];
};

/** values for part inquiry on car */
export enum PartType {
  Chasis = 'CHASIS',
  Engine = 'ENGINE',
  Front = 'FRONT',
  Rear = 'REAR'
}

export type Query = {
  __typename?: 'Query';
  EngineerInfo: EngineerDetailsResponse;
  Engineers: Array<Engineer>;
  carCondition: ConditionResponse;
  drivers: Array<Driver>;
  hello: Scalars['String'];
  me?: Maybe<Login>;
  mechanics: MechanicResponse;
  myCar: Array<Car>;
  myDetails: DriverDetailsResponse;
  myDrivers: Array<Driver>;
  myEngineers: Array<Engineer>;
  sponsors: Array<Revenue>;
  users: Array<Login>;
};


export type QueryEngineerInfoArgs = {
  id: Scalars['Int'];
};


export type QueryEngineersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryCarConditionArgs = {
  carId: Scalars['Int'];
  part: PartType;
};


export type QueryDriversArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryMechanicsArgs = {
  carId: Scalars['Int'];
};


export type QueryMyCarArgs = {
  id: Scalars['Int'];
};


export type QueryMyDetailsArgs = {
  id: Scalars['Int'];
};


export type QuerySponsorsArgs = {
  carId: Scalars['Int'];
};

/** this is the revenue type for the sponsor */
export enum RType {
  Other = 'OTHER',
  Partner = 'PARTNER',
  Title = 'TITLE'
}

export type Revenue = {
  __typename?: 'Revenue';
  duration: Scalars['String'];
  r_id: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['Int'];
};

export type SponsorInput = {
  duration: Scalars['String'];
  type: RType;
  value: Scalars['Int'];
};

export type SponsorResponse = {
  __typename?: 'SponsorResponse';
  errors?: Maybe<Array<FError>>;
  revenue?: Maybe<Revenue>;
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

export type MechanicResponse = {
  __typename?: 'mechanicResponse';
  errors?: Maybe<Array<FError>>;
  mechanic: Array<Mechanic>;
};

export type CreateContractMutationVariables = Exact<{
  typeId?: InputMaybe<Scalars['Int']>;
  options: Contractdetails;
}>;


export type CreateContractMutation = { __typename?: 'Mutation', createContract: { __typename?: 'ContractResponse', contract?: { __typename?: 'Contract', contract_id: number, duration: string, status: boolean, type: string, value: number } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

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

export type MyDriversQueryVariables = Exact<{ [key: string]: never; }>;


export type MyDriversQuery = { __typename?: 'Query', myDrivers: Array<{ __typename?: 'Driver', Dname: string, Dage: number, pos: number, driver_id: number, status: string }> };

export type CarConditionQueryVariables = Exact<{
  part: PartType;
  carId: Scalars['Int'];
}>;


export type CarConditionQuery = { __typename?: 'Query', carCondition: { __typename?: 'ConditionResponse', condition?: Array<{ __typename?: 'ConditonType', condition: EngineParts, part: string }> | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type CarMechanicsQueryVariables = Exact<{
  carId: Scalars['Int'];
}>;


export type CarMechanicsQuery = { __typename?: 'Query', mechanics: { __typename?: 'mechanicResponse', mechanic: Array<{ __typename?: 'Mechanic', mech_id: number, Mname: string, part: number }>, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type DriverDetailsQueryVariables = Exact<{
  myDetailsId: Scalars['Int'];
}>;


export type DriverDetailsQuery = { __typename?: 'Query', myDetails: { __typename?: 'DriverDetailsResponse', contract?: { __typename?: 'Contract', contract_id: number, duration: string, status: boolean, type: string, value: number } | null | undefined, driver?: { __typename?: 'Driver', Dname: string, driver_id: number, Dage: number, pos: number, status: string } | null | undefined, engineer?: { __typename?: 'Engineer', engineer_id: number, Eage: number, Ename: string, status: boolean } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type DriversQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type DriversQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', Dage: number, Dname: string, driver_id: number, pos: number, status: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'login', id: number, uname: string } | null | undefined };

export type MyCarQueryVariables = Exact<{
  myCarId: Scalars['Int'];
}>;


export type MyCarQuery = { __typename?: 'Query', myCar: Array<{ __typename?: 'Car', car_id: number, chasis: string, driverId: number, E_condition: string, engineSupplier: string, front: string, isActiveCar: boolean, rear: string }> };

export type MyEngineersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEngineersQuery = { __typename?: 'Query', myEngineers: Array<{ __typename?: 'Engineer', Eage: number, Ename: string, engineer_id: number, status: boolean }> };


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
export const MyDriversDocument = gql`
    query MyDrivers {
  myDrivers {
    Dname
    Dage
    pos
    driver_id
    status
  }
}
    `;

export function useMyDriversQuery(options: Omit<Urql.UseQueryArgs<MyDriversQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyDriversQuery>({ query: MyDriversDocument, ...options });
};
export const CarConditionDocument = gql`
    query CarCondition($part: PartType!, $carId: Int!) {
  carCondition(part: $part, carId: $carId) {
    condition {
      condition
      part
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCarConditionQuery(options: Omit<Urql.UseQueryArgs<CarConditionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CarConditionQuery>({ query: CarConditionDocument, ...options });
};
export const CarMechanicsDocument = gql`
    query carMechanics($carId: Int!) {
  mechanics(carId: $carId) {
    mechanic {
      mech_id
      Mname
      part
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCarMechanicsQuery(options: Omit<Urql.UseQueryArgs<CarMechanicsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CarMechanicsQuery>({ query: CarMechanicsDocument, ...options });
};
export const DriverDetailsDocument = gql`
    query DriverDetails($myDetailsId: Int!) {
  myDetails(id: $myDetailsId) {
    contract {
      contract_id
      duration
      status
      type
      value
    }
    driver {
      Dname
      driver_id
      Dage
      pos
      status
    }
    engineer {
      engineer_id
      Eage
      Ename
      engineer_id
      status
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useDriverDetailsQuery(options: Omit<Urql.UseQueryArgs<DriverDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DriverDetailsQuery>({ query: DriverDetailsDocument, ...options });
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
export const MyCarDocument = gql`
    query myCar($myCarId: Int!) {
  myCar(id: $myCarId) {
    car_id
    chasis
    driverId
    E_condition
    engineSupplier
    front
    isActiveCar
    rear
  }
}
    `;

export function useMyCarQuery(options: Omit<Urql.UseQueryArgs<MyCarQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyCarQuery>({ query: MyCarDocument, ...options });
};
export const MyEngineersDocument = gql`
    query MyEngineers {
  myEngineers {
    Eage
    Ename
    engineer_id
    status
  }
}
    `;

export function useMyEngineersQuery(options: Omit<Urql.UseQueryArgs<MyEngineersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyEngineersQuery>({ query: MyEngineersDocument, ...options });
};