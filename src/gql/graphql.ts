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

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']>;
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

export type Likes = Node & {
  __typename?: 'Likes';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  recommend?: Maybe<Recommends>;
  recommendId: Scalars['UUID'];
  user?: Maybe<Users>;
  userId: Scalars['UUID'];
};

export type LikesConnection = {
  __typename?: 'LikesConnection';
  edges: Array<LikesEdge>;
  pageInfo: PageInfo;
};

export type LikesDeleteResponse = {
  __typename?: 'LikesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

export type LikesEdge = {
  __typename?: 'LikesEdge';
  cursor: Scalars['String'];
  node: Likes;
};

export type LikesFilter = {
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  recommendId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type LikesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  recommendId?: InputMaybe<Scalars['UUID']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type LikesInsertResponse = {
  __typename?: 'LikesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

export type LikesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  recommendId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type LikesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  recommendId?: InputMaybe<Scalars['UUID']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type LikesUpdateResponse = {
  __typename?: 'LikesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Likes>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `Likes` collection */
  deleteFromLikesCollection: LikesDeleteResponse;
  /** Deletes zero or more records from the `Recommends` collection */
  deleteFromRecommendsCollection: RecommendsDeleteResponse;
  /** Deletes zero or more records from the `Users` collection */
  deleteFromUsersCollection: UsersDeleteResponse;
  /** Adds one or more `Likes` records to the collection */
  insertIntoLikesCollection?: Maybe<LikesInsertResponse>;
  /** Adds one or more `Recommends` records to the collection */
  insertIntoRecommendsCollection?: Maybe<RecommendsInsertResponse>;
  /** Adds one or more `Users` records to the collection */
  insertIntoUsersCollection?: Maybe<UsersInsertResponse>;
  /** Updates zero or more records in the `Likes` collection */
  updateLikesCollection: LikesUpdateResponse;
  /** Updates zero or more records in the `Recommends` collection */
  updateRecommendsCollection: RecommendsUpdateResponse;
  /** Updates zero or more records in the `Users` collection */
  updateUsersCollection: UsersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromLikesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromRecommendsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<RecommendsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUsersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoLikesCollectionArgs = {
  objects: Array<LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoRecommendsCollectionArgs = {
  objects: Array<RecommendsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUsersCollectionArgs = {
  objects: Array<UsersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateLikesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LikesFilter>;
  set: LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateRecommendsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<RecommendsFilter>;
  set: RecommendsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUsersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UsersFilter>;
  set: UsersUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID'];
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
  /** A pagable collection of type `Likes` */
  likesCollection?: Maybe<LikesConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `Recommends` */
  recommendsCollection?: Maybe<RecommendsConnection>;
  /** A pagable collection of type `Users` */
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
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
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

export type Recommends = Node & {
  __typename?: 'Recommends';
  categoryId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  detail?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  likesCollection?: Maybe<LikesConnection>;
  likesCount?: Maybe<Scalars['Int']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['UUID']>;
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
  __typename?: 'RecommendsConnection';
  edges: Array<RecommendsEdge>;
  pageInfo: PageInfo;
};

export type RecommendsDeleteResponse = {
  __typename?: 'RecommendsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
};

export type RecommendsEdge = {
  __typename?: 'RecommendsEdge';
  cursor: Scalars['String'];
  node: Recommends;
};

export type RecommendsFilter = {
  categoryId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  detail?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type RecommendsInsertInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type RecommendsInsertResponse = {
  __typename?: 'RecommendsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
};

export type RecommendsOrderBy = {
  categoryId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  detail?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type RecommendsUpdateInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type RecommendsUpdateResponse = {
  __typename?: 'RecommendsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Recommends>;
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

export type Users = Node & {
  __typename?: 'Users';
  avatarUrl?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  instagramUrl?: Maybe<Scalars['String']>;
  likesCollection?: Maybe<LikesConnection>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  recommendsCollection?: Maybe<RecommendsConnection>;
  twitterUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  userName?: Maybe<Scalars['String']>;
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
  __typename?: 'UsersConnection';
  edges: Array<UsersEdge>;
  pageInfo: PageInfo;
};

export type UsersDeleteResponse = {
  __typename?: 'UsersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersEdge = {
  __typename?: 'UsersEdge';
  cursor: Scalars['String'];
  node: Users;
};

export type UsersFilter = {
  avatarUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagramUrl?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  twitterUrl?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  userName?: InputMaybe<StringFilter>;
};

export type UsersInsertInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  instagramUrl?: InputMaybe<Scalars['String']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UsersInsertResponse = {
  __typename?: 'UsersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersOrderBy = {
  avatarUrl?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  instagramUrl?: InputMaybe<OrderByDirection>;
  twitterUrl?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  userName?: InputMaybe<OrderByDirection>;
};

export type UsersUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  instagramUrl?: InputMaybe<Scalars['String']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UsersUpdateResponse = {
  __typename?: 'UsersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};
