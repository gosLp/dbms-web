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

/** Type of management */
export enum MType {
  Advisor = 'ADVISOR',
  Director = 'DIRECTOR',
  Principle = 'PRINCIPLE'
}

export type Management = {
  __typename?: 'Management';
  m_id: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['Boolean'];
  type: MType;
};

export type Mechanic = {
  __typename?: 'Mechanic';
  Mname: Scalars['String'];
  mech_id: Scalars['Int'];
  part: Parts;
  status: Scalars['Boolean'];
};

export type MechanicResponse = {
  __typename?: 'MechanicResponse';
  errors?: Maybe<Array<FError>>;
  mechanic?: Maybe<Mechanic>;
};

export type Mutation = {
  __typename?: 'Mutation';
  NewMechanic: MechanicResponse;
  assignMechanic: MechanicResponse;
  createContract: ContractResponse;
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  newDriver: CarResponse;
  newDriverEngineer: Driver;
  newEngineer: EngineerResponse;
  newSponsor: SponsorResponse;
  register: UserResponse;
  updateUser?: Maybe<Login>;
};


export type MutationNewMechanicArgs = {
  Mname: Scalars['String'];
  carId: Scalars['Int'];
};


export type MutationAssignMechanicArgs = {
  Mid: Scalars['Int'];
  carId: Scalars['Int'];
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


export type MutationNewDriverEngineerArgs = {
  driverId: Scalars['Int'];
  eId: Scalars['Int'];
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

/** Part on which the mechanic works on */
export enum Parts {
  Aero = 'AERO',
  Chasis = 'CHASIS',
  Crew = 'CREW',
  Engine = 'ENGINE'
}

export type Query = {
  __typename?: 'Query';
  EngineerInfo: EngineerDetailsResponse;
  Engineers: Array<Engineer>;
  MechInfo: MechanicResponse;
  carCondition: CarConditionResponse;
  drivers: Array<Driver>;
  hello: Scalars['String'];
  me?: Maybe<Login>;
  mechanics: MechanicResponse;
  myCar: Array<Car>;
  myDetails: DriverDetailsResponse;
  myDrivers: Array<Driver>;
  myEngineers: Array<Engineer>;
  myManagement: Array<Management>;
  myMechanics: Array<Mechanic>;
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


export type QueryMechInfoArgs = {
  mechId: Scalars['Int'];
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

export type CarConditionResponse = {
  __typename?: 'carConditionResponse';
  condition?: Maybe<Array<ConditonType>>;
  errors?: Maybe<Array<FError>>;
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

export type NewDriverMutationVariables = Exact<{
  carId: Scalars['Int'];
  driverId: Scalars['Int'];
}>;


export type NewDriverMutation = { __typename?: 'Mutation', newDriver: { __typename?: 'CarResponse', car?: { __typename?: 'Car', car_id: number, chasis: string, driverId: number, E_condition: string, engineSupplier: string, front: string, isActiveCar: boolean, rear: string } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type AssignMechanicMutationVariables = Exact<{
  carId: Scalars['Int'];
  mid: Scalars['Int'];
}>;


export type AssignMechanicMutation = { __typename?: 'Mutation', assignMechanic: { __typename?: 'MechanicResponse', mechanic?: { __typename?: 'Mechanic', mech_id: number, Mname: string, part: Parts, status: boolean } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type CreateContractMutationVariables = Exact<{
  typeId?: InputMaybe<Scalars['Int']>;
  options: Contractdetails;
}>;


export type CreateContractMutation = { __typename?: 'Mutation', createContract: { __typename?: 'ContractResponse', contract?: { __typename?: 'Contract', contract_id: number, duration: string, status: boolean, type: string, value: number } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type EngineerMutationVariables = Exact<{
  options: EngineerInput;
}>;


export type EngineerMutation = { __typename?: 'Mutation', newEngineer: { __typename?: 'EngineerResponse', engineer?: { __typename?: 'Engineer', Eage: number, Ename: string, engineer_id: number, status: boolean } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'login', id: number, uname: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type NewDriverEngineerMutationVariables = Exact<{
  eId: Scalars['Int'];
  driverId: Scalars['Int'];
}>;


export type NewDriverEngineerMutation = { __typename?: 'Mutation', newDriverEngineer: { __typename?: 'Driver', driver_id: number, Dname: string } };

export type NewMechanicMutationVariables = Exact<{
  carId: Scalars['Int'];
  mname: Scalars['String'];
}>;


export type NewMechanicMutation = { __typename?: 'Mutation', NewMechanic: { __typename?: 'MechanicResponse', errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined, mechanic?: { __typename?: 'Mechanic', mech_id: number, Mname: string, part: Parts } | null | undefined } };

export type Unnamed_1_MutationVariables = Exact<{
  options: SponsorInput;
}>;


export type Unnamed_1_Mutation = { __typename?: 'Mutation', newSponsor: { __typename?: 'SponsorResponse', errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined, revenue?: { __typename?: 'Revenue', duration: string, r_id: number, type: string, value: number } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'login', id: number, uname: string } | null | undefined } };

export type ActiveMechanicsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveMechanicsQuery = { __typename?: 'Query', myMechanics: Array<{ __typename?: 'Mechanic', mech_id: number, Mname: string, part: Parts, status: boolean }> };

export type EngineerInfoQueryVariables = Exact<{
  engineerInfoId: Scalars['Int'];
}>;


export type EngineerInfoQuery = { __typename?: 'Query', EngineerInfo: { __typename?: 'EngineerDetailsResponse', contract?: { __typename?: 'Contract', contract_id: number, duration: string, status: boolean, type: string, value: number } | null | undefined, engineer?: { __typename?: 'Engineer', Eage: number, Ename: string, engineer_id: number, status: boolean } | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type MechInfoQueryVariables = Exact<{
  mechId: Scalars['Int'];
}>;


export type MechInfoQuery = { __typename?: 'Query', MechInfo: { __typename?: 'MechanicResponse', mechanic?: { __typename?: 'Mechanic', mech_id: number, Mname: string, part: Parts, status: boolean } | null | undefined } };

export type MyDriversQueryVariables = Exact<{ [key: string]: never; }>;


export type MyDriversQuery = { __typename?: 'Query', myDrivers: Array<{ __typename?: 'Driver', Dname: string, Dage: number, pos: number, driver_id: number, status: string }> };

export type SponsorsQueryVariables = Exact<{
  carId: Scalars['Int'];
}>;


export type SponsorsQuery = { __typename?: 'Query', sponsors: Array<{ __typename?: 'Revenue', duration: string, r_id: number, type: string, value: number }> };

export type EngineersQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type EngineersQuery = { __typename?: 'Query', Engineers: Array<{ __typename?: 'Engineer', Eage: number, Ename: string, engineer_id: number, status: boolean }> };

export type CarConditionQueryVariables = Exact<{
  part: PartType;
  carId: Scalars['Int'];
}>;


export type CarConditionQuery = { __typename?: 'Query', carCondition: { __typename?: 'carConditionResponse', condition?: Array<{ __typename?: 'ConditonType', condition: EngineParts, part: string }> | null | undefined, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

export type CarMechanicsQueryVariables = Exact<{
  carId: Scalars['Int'];
}>;


export type CarMechanicsQuery = { __typename?: 'Query', mechanics: { __typename?: 'mechanicResponse', mechanic: Array<{ __typename?: 'Mechanic', mech_id: number, Mname: string, part: Parts }>, errors?: Array<{ __typename?: 'FError', field: string, message: string }> | null | undefined } };

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


export const NewDriverDocument = gql`
    mutation NewDriver($carId: Int!, $driverId: Int!) {
  newDriver(id: $carId, driver_id: $driverId) {
    car {
      car_id
      chasis
      driverId
      E_condition
      engineSupplier
      front
      isActiveCar
      rear
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useNewDriverMutation() {
  return Urql.useMutation<NewDriverMutation, NewDriverMutationVariables>(NewDriverDocument);
};
export const AssignMechanicDocument = gql`
    mutation assignMechanic($carId: Int!, $mid: Int!) {
  assignMechanic(carId: $carId, Mid: $mid) {
    mechanic {
      mech_id
      Mname
      part
      status
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useAssignMechanicMutation() {
  return Urql.useMutation<AssignMechanicMutation, AssignMechanicMutationVariables>(AssignMechanicDocument);
};
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
export const EngineerDocument = gql`
    mutation Engineer($options: EngineerInput!) {
  newEngineer(options: $options) {
    engineer {
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

export function useEngineerMutation() {
  return Urql.useMutation<EngineerMutation, EngineerMutationVariables>(EngineerDocument);
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
export const NewDriverEngineerDocument = gql`
    mutation newDriverEngineer($eId: Int!, $driverId: Int!) {
  newDriverEngineer(eId: $eId, driverId: $driverId) {
    driver_id
    Dname
  }
}
    `;

export function useNewDriverEngineerMutation() {
  return Urql.useMutation<NewDriverEngineerMutation, NewDriverEngineerMutationVariables>(NewDriverEngineerDocument);
};
export const NewMechanicDocument = gql`
    mutation newMechanic($carId: Int!, $mname: String!) {
  NewMechanic(carId: $carId, Mname: $mname) {
    errors {
      field
      message
    }
    mechanic {
      mech_id
      Mname
      part
    }
  }
}
    `;

export function useNewMechanicMutation() {
  return Urql.useMutation<NewMechanicMutation, NewMechanicMutationVariables>(NewMechanicDocument);
};
export const Document = gql`
    mutation ($options: SponsorInput!) {
  newSponsor(options: $options) {
    errors {
      field
      message
    }
    revenue {
      duration
      r_id
      type
      value
    }
  }
}
    `;

export function useMutation() {
  return Urql.useMutation<Mutation, MutationVariables>(Document);
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
export const ActiveMechanicsDocument = gql`
    query ActiveMechanics {
  myMechanics {
    mech_id
    Mname
    part
    status
  }
}
    `;

export function useActiveMechanicsQuery(options: Omit<Urql.UseQueryArgs<ActiveMechanicsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ActiveMechanicsQuery>({ query: ActiveMechanicsDocument, ...options });
};
export const EngineerInfoDocument = gql`
    query EngineerInfo($engineerInfoId: Int!) {
  EngineerInfo(id: $engineerInfoId) {
    contract {
      contract_id
      duration
      status
      type
      value
    }
    engineer {
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

export function useEngineerInfoQuery(options: Omit<Urql.UseQueryArgs<EngineerInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EngineerInfoQuery>({ query: EngineerInfoDocument, ...options });
};
export const MechInfoDocument = gql`
    query MechInfo($mechId: Int!) {
  MechInfo(mechId: $mechId) {
    mechanic {
      mech_id
      Mname
      part
      status
    }
  }
}
    `;

export function useMechInfoQuery(options: Omit<Urql.UseQueryArgs<MechInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MechInfoQuery>({ query: MechInfoDocument, ...options });
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
export const SponsorsDocument = gql`
    query Sponsors($carId: Int!) {
  sponsors(carId: $carId) {
    duration
    r_id
    type
    value
  }
}
    `;

export function useSponsorsQuery(options: Omit<Urql.UseQueryArgs<SponsorsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SponsorsQuery>({ query: SponsorsDocument, ...options });
};
export const EngineersDocument = gql`
    query Engineers($limit: Int!) {
  Engineers(limit: $limit) {
    Eage
    Ename
    engineer_id
    status
  }
}
    `;

export function useEngineersQuery(options: Omit<Urql.UseQueryArgs<EngineersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EngineersQuery>({ query: EngineersDocument, ...options });
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