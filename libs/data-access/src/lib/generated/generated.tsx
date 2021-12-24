import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSet?: Maybe<Set>;
};


export type MutationAddSetArgs = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  day?: InputMaybe<Scalars['Int']>;
  end_time?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
  updated?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allSets?: Maybe<Array<Maybe<Set>>>;
};

export type Set = {
  __typename?: 'Set';
  address?: Maybe<Scalars['String']>;
  approximate?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  end_time?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  updated?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type SetListQueryVariables = Exact<{ [key: string]: never; }>;


export type SetListQuery = { __typename?: 'Query', allSets?: Array<{ __typename?: 'Set', id: number, name?: string | null | undefined, day?: number | null | undefined, slug?: string | null | undefined, time?: string | null | undefined, end_time?: string | null | undefined, group?: string | null | undefined, updated?: string | null | undefined, address?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, postal_code?: string | null | undefined, country?: string | null | undefined } | null | undefined> | null | undefined };

export type AddSetMutationVariables = Exact<{
  name: Scalars['String'];
  day: Scalars['Int'];
  time: Scalars['String'];
  end_time: Scalars['String'];
  group: Scalars['String'];
  updated: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
}>;


export type AddSetMutation = { __typename?: 'Mutation', addSet?: { __typename?: 'Set', name?: string | null | undefined, day?: number | null | undefined, slug?: string | null | undefined, time?: string | null | undefined, end_time?: string | null | undefined, group?: string | null | undefined, updated?: string | null | undefined, address?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, postal_code?: string | null | undefined, country?: string | null | undefined } | null | undefined };


export const SetListDocument = gql`
    query setList {
  allSets {
    id
    name
    day
    slug
    time
    end_time
    group
    updated
    address
    city
    state
    postal_code
    country
  }
}
    `;

/**
 * __useSetListQuery__
 *
 * To run a query within a React component, call `useSetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetListQuery(baseOptions?: Apollo.QueryHookOptions<SetListQuery, SetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SetListQuery, SetListQueryVariables>(SetListDocument, options);
      }
export function useSetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SetListQuery, SetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SetListQuery, SetListQueryVariables>(SetListDocument, options);
        }
export type SetListQueryHookResult = ReturnType<typeof useSetListQuery>;
export type SetListLazyQueryHookResult = ReturnType<typeof useSetListLazyQuery>;
export type SetListQueryResult = Apollo.QueryResult<SetListQuery, SetListQueryVariables>;
export const AddSetDocument = gql`
    mutation addSet($name: String!, $day: Int!, $time: String!, $end_time: String!, $group: String!, $updated: String!, $address: String!, $city: String!, $state: String!, $postal_code: String!, $country: String) {
  addSet(
    name: $name
    day: $day
    time: $time
    end_time: $end_time
    group: $group
    updated: $updated
    address: $address
    city: $city
    state: $state
    postal_code: $postal_code
    country: $country
  ) {
    name
    day
    slug
    time
    end_time
    group
    updated
    address
    city
    state
    postal_code
    country
  }
}
    `;
export type AddSetMutationFn = Apollo.MutationFunction<AddSetMutation, AddSetMutationVariables>;

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      day: // value for 'day'
 *      time: // value for 'time'
 *      end_time: // value for 'end_time'
 *      group: // value for 'group'
 *      updated: // value for 'updated'
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      postal_code: // value for 'postal_code'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: Apollo.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, options);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = Apollo.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = Apollo.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;