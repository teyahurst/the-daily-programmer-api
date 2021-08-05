create table if not exists articles(
    article_id SERIAL UNIQUE,
    article_url TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    urltoimage TEXT UNIQUE NOT NULL,
    likes Integer NOT NULL,
    dislikes Integer NOT NULL,
    content TEXT

);

