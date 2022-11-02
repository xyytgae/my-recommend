-- テーブルを作成
DROP TABLE IF EXISTS public.likes;

DROP TABLE IF EXISTS public.recommends;

DROP TABLE IF EXISTS public.users;

-- DROP extension IF EXISTS "uuid-ossp";
CREATE extension IF NOT EXISTS "uuid-ossp" WITH schema extensions;

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  updated_at TIMESTAMP WITH time zone,
  user_name text UNIQUE,
  avatar_url text,
  twitter_url text,
  instagram_url text,
  PRIMARY KEY(id),
  -- FOREIGN KEY(id) REFERENCES auth.users(id),
  CONSTRAINT user_name_length CHECK (char_length(user_name) >= 3)
);

CREATE TABLE public.recommends (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH time zone DEFAULT timezone('utc' :: text, NOW()) NOT NULL,
  title VARCHAR(50),
  detail text,
  images text ARRAY,
  user_id uuid,
  -- user_id uuid NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES public.users (id)
);

CREATE TABLE public.likes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH time zone DEFAULT timezone('utc' :: text, NOW()) NOT NULL,
  user_id uuid NOT NULL,
  recommend_id uuid NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES public.users (id),
  FOREIGN KEY(recommend_id) REFERENCES public.recommends (id)
);

-- RLSを有効化
ALTER TABLE
  public.users enable ROW LEVEL SECURITY;

ALTER TABLE
  public.recommends enable ROW LEVEL SECURITY;

ALTER TABLE
  public.likes enable ROW LEVEL SECURITY;

-- ポリシーを作成
CREATE POLICY "usersを誰でもアクセスできる" ON public.users FOR
SELECT
  USING (TRUE);

CREATE POLICY "usersを誰でも作成可能" ON public.users FOR
INSERT
  WITH CHECK (TRUE);

CREATE POLICY "recommendsを誰でもアクセスできる" ON public.recommends FOR
SELECT
  USING (TRUE);

CREATE POLICY "likesを誰でもアクセスできる" ON public.likes FOR
SELECT
  USING (TRUE);

-- データを追加
INSERT INTO
  public.users (
    user_name,
    avatar_url,
    twitter_url,
    instagram_url
  )
VALUES
  ('test_user1', '/images/pic6.jpg', '', ''),
  ('test_user2', '/images/pic7.jpg', '', ''),
  ('test_user3', '', '', '');

INSERT INTO
  public.recommends (created_at, title, detail, images, user_id)
VALUES
  (
    '2022/11/1',
    'タイトル1',
    '詳細詳細1',
    ARRAY ['/images/pic1.jpg', '/images/pic3.jpg', '/images/pic2.jpg'],
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user1'
    )
  ),
  (
    '2022/10/1',
    'タイトル2',
    '詳細詳細2',
    ARRAY ['/images/pic4.jpg', '/images/pic5.jpg'],
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user2'
    )
  ),
  (
    '2022/9/1',
    'タイトル3',
    '詳細詳細3',
    NULL,
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user3'
    )
  );

INSERT INTO
  public.likes (user_id, recommend_id)
VALUES
  (
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user1'
    ),
    (
      SELECT
        id
      FROM
        public.recommends
      WHERE
        title = 'タイトル1'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user2'
    ),
    (
      SELECT
        id
      FROM
        public.recommends
      WHERE
        title = 'タイトル1'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user3'
    ),
    (
      SELECT
        id
      FROM
        public.recommends
      WHERE
        title = 'タイトル1'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user3'
    ),
    (
      SELECT
        id
      FROM
        public.recommends
      WHERE
        title = 'タイトル2'
    )
  );