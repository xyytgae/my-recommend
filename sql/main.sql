-- テーブルを作成
DROP TABLE IF EXISTS public.likes CASCADE;

DROP TABLE IF EXISTS public.recommends CASCADE;

DROP TABLE IF EXISTS public.users CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

COMMENT ON SCHEMA public IS '@graphql({"inflect_names": true})';

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  updated_at timestamp with time zone,
  user_name text UNIQUE,
  avatar_url text,
  twitter_url text,
  instagram_url text,
  PRIMARY KEY (id),
  -- FOREIGN KEY(id) REFERENCES auth.public.users(id),
  CONSTRAINT user_name_length CHECK (CHAR_LENGTH(user_name) >= 3)
);

CREATE TABLE public.recommends (
  id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  created_at timestamp with time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title varchar(50),
  detail text,
  images text ARRAY,
  user_id uuid,
  category_id text,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES public.users (id)
);

CREATE TABLE public.likes (
  id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  created_at timestamp with time zone DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id uuid NOT NULL,
  recommend_id uuid NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES public.users (id),
  FOREIGN KEY (recommend_id) REFERENCES public.recommends (id)
);

CREATE FUNCTION public._likes_count (rec public.recommends)
  RETURNS integer IMMUTABLE STRICT
  LANGUAGE SQL
  AS '
SELECT
  count(*)
from
  public.likes
where
  recommend_id = rec.id '
;

CREATE FUNCTION public.user (rec public.recommends)
  RETURNS SETOF record AS $$
BEGIN
  RETURN query
  SELECT
    *
  FROM
    public.users
  WHERE
    id = rec.user_id;
END;
  $$
  LANGUAGE plpgsql;
  -- RLSを有効化
  ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.recommends ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
  -- ポリシーを作成
  CREATE POLICY "usersを誰でもアクセスできる" ON public.users
    FOR SELECT
      USING (TRUE );
  CREATE POLICY "usersを誰でも作成可能" ON public.users
    FOR INSERT
      WITH CHECK (TRUE );
  CREATE POLICY "recommendsを誰でもアクセスできる" ON public.recommends
    FOR SELECT
      USING (TRUE );
  CREATE POLICY "likesを誰でもアクセスできる" ON public.likes
    FOR SELECT
      USING (TRUE );
