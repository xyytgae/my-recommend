-- データを追加
INSERT INTO public.users (user_name, avatar_url, twitter_url, instagram_url)
  VALUES ('test_user1', '/images/pic6.jpg', '', ''), ('test_user2', '/images/pic7.jpg', '', ''), ('test_user3', '', '', '');

INSERT INTO public.recommends (created_at, title, detail, images, user_id)
  VALUES ('2022/11/1', 'タイトル1', '詳細詳細1', ARRAY['/images/pic1.jpg', '/images/pic3.jpg', '/images/pic2.jpg'], (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user1')),
  ('2022/10/1',
    'タイトル2',
    '詳細詳細2',
    ARRAY['/images/pic4.jpg', '/images/pic5.jpg'],
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user2')),
  ('2022/9/1',
    'タイトル3',
    '詳細詳細3',
    NULL,
    (
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user3'));

INSERT INTO public.likes (user_id, recommend_id)
  VALUES ((
      SELECT
        id
      FROM
        public.users
      WHERE
        user_name = 'test_user1'), (
        SELECT
          id
        FROM
          public.recommends
        WHERE
          title = 'タイトル1')),
    ((
      SELECT
        id
      FROM public.users
      WHERE
        user_name = 'test_user2'), (
      SELECT
        id
      FROM public.recommends
    WHERE
      title = 'タイトル1')),
  ((
    SELECT
      id
    FROM public.users
  WHERE
    user_name = 'test_user3'), (
  SELECT
    id
  FROM public.recommends
WHERE
  title = 'タイトル1')),
  ((
    SELECT
      id
    FROM public.users
  WHERE
    user_name = 'test_user3'), (
  SELECT
    id
  FROM public.recommends
WHERE
  title = 'タイトル2'));

