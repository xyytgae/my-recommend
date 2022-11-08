/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the collection */
  deleteFromlikesCollection: LikesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromrecommendsCollection: RecommendsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromusersCollection: UsersDeleteResponse;
  /** Adds one or more `likesInsertResponse` records to the collection */
  insertIntolikesCollection?: Maybe<LikesInsertResponse>;
  /** Adds one or more `recommendsInsertResponse` records to the collection */
  insertIntorecommendsCollection?: Maybe<RecommendsInsertResponse>;
  /** Adds one or more `usersInsertResponse` records to the collection */
  insertIntousersCollection?: Maybe<UsersInsertResponse>;
  /** Updates zero or more records in the collection */
  updatelikesCollection: LikesUpdateResponse;
  /** Updates zero or more records in the collection */
  updaterecommendsCollection: RecommendsUpdateResponse;
  /** Updates zero or more records in the collection */
  updateusersCollection: UsersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromlikesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrecommendsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<RecommendsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromusersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntolikesCollectionArgs = {
  objects: Array<LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorecommendsCollectionArgs = {
  objects: Array<RecommendsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntousersCollectionArgs = {
  objects: Array<UsersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatelikesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LikesFilter>;
  set: LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdaterecommendsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<RecommendsFilter>;
  set: RecommendsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateusersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
  set: UsersUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `likes` */
  likesCollection?: Maybe<LikesConnection>;
  /** A pagable collection of type `recommends` */
  recommendsCollection?: Maybe<RecommendsConnection>;
  /** A pagable collection of type `users` */
  usersCollection?: Maybe<UsersConnection>;
};


/** The root type for querying data */
export type QueryLikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<LikesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LikesOrderBy>>;
};


/** The root type for querying data */
export type QueryRecommendsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<RecommendsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RecommendsOrderBy>>;
};


/** The root type for querying data */
export type QueryUsersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<Scalars['Time']>>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Likes = {
  __typename?: 'likes';
  created_at: Scalars['Datetime'];
  id: Scalars['UUID'];
  recommend_id: Scalars['UUID'];
  recommends?: Maybe<Recommends>;
  user_id: Scalars['UUID'];
  users?: Maybe<Users>;
};

export type LikesConnection = {
  __typename?: 'likesConnection';
  edges: Array<LikesEdge>;
  pageInfo: PageInfo;
};

export type LikesDeleteResponse = {
  __typename?: 'likesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

export type LikesEdge = {
  __typename?: 'likesEdge';
  cursor: Scalars['String'];
  node: Likes;
};

export type LikesFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  recommend_id?: InputMaybe<UuidFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type LikesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  recommend_id?: InputMaybe<Scalars['UUID']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type LikesInsertResponse = {
  __typename?: 'likesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

export type LikesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  recommend_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type LikesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  recommend_id?: InputMaybe<Scalars['UUID']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type LikesUpdateResponse = {
  __typename?: 'likesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

export type Recommends = {
  __typename?: 'recommends';
  created_at: Scalars['Datetime'];
  detail?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  likesCollection?: Maybe<LikesConnection>;
  title?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['UUID']>;
  users?: Maybe<Users>;
};


export type RecommendsLikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<LikesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LikesOrderBy>>;
};

export type RecommendsConnection = {
  __typename?: 'recommendsConnection';
  edges: Array<RecommendsEdge>;
  pageInfo: PageInfo;
};

export type RecommendsDeleteResponse = {
  __typename?: 'recommendsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
};

export type RecommendsEdge = {
  __typename?: 'recommendsEdge';
  cursor: Scalars['String'];
  node: Recommends;
};

export type RecommendsFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  detail?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  title?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type RecommendsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  title?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type RecommendsInsertResponse = {
  __typename?: 'recommendsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
};

export type RecommendsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  detail?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  images?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type RecommendsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  title?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['UUID']>;
};

export type RecommendsUpdateResponse = {
  __typename?: 'recommendsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
};

export type Users = {
  __typename?: 'users';
  avatar_url?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  instagram_url?: Maybe<Scalars['String']>;
  likesCollection?: Maybe<LikesConnection>;
  recommendsCollection?: Maybe<RecommendsConnection>;
  twitter_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Datetime']>;
  user_name?: Maybe<Scalars['String']>;
};


export type UsersLikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<LikesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LikesOrderBy>>;
};


export type UsersRecommendsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<RecommendsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RecommendsOrderBy>>;
};

export type UsersConnection = {
  __typename?: 'usersConnection';
  edges: Array<UsersEdge>;
  pageInfo: PageInfo;
};

export type UsersDeleteResponse = {
  __typename?: 'usersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersEdge = {
  __typename?: 'usersEdge';
  cursor: Scalars['String'];
  node: Users;
};

export type UsersFilter = {
  avatar_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagram_url?: InputMaybe<StringFilter>;
  twitter_url?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_name?: InputMaybe<StringFilter>;
};

export type UsersInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  instagram_url?: InputMaybe<Scalars['String']>;
  twitter_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type UsersInsertResponse = {
  __typename?: 'usersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  instagram_url?: InputMaybe<OrderByDirection>;
  twitter_url?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_name?: InputMaybe<OrderByDirection>;
};

export type UsersUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  instagram_url?: InputMaybe<Scalars['String']>;
  twitter_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type UsersUpdateResponse = {
  __typename?: 'usersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};
