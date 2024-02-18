This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## database

```js
table user {
    id uuid pl
    username string [not null, unique]
    email string
}

table tweet {
    id uuid pk
    text string
    authorId string - user.id
    createdAt datetime
    updatedAt datetime
}

ref: tweet.id <> hashtag.id
ref: user.id < tweet.authorId

table hashtag {
    id uuid pk
    name string
}

table reply {
    id uuid pk
    text string
    userId string - user.id
    tweetId string - tweet.id
    replyId string - reply.id
}

ref: reply.userId > user.id
ref: reply.tweetId > tweet.id
ref: reply.id <> reply.replyId

table like {
    id uuid pk
    userId string - user.id
    tweetId string - tweet.id
    createdAt datetime

    indexes {
        (userId, tweetId) [unique]
    }
}

ref: like.userId > user.id
ref: like.tweetId > tweet.id

table bookmark {
    id uuid pk
    userId string - user.id
    tweetId string - tweet.id
    createdAt datetime

}
```

sql editor

```

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> "username");
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


CREATE table tweets (
  id uuid primary key,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  foreign key (profile_id) references profiles(id) on delete cascade
);

create table hashtags (
  id uuid primary key,
  name text not null
);

create table tweet_hashtag (
  tweet_id uuid not null,
  hashtag_id uuid not null,
  primary key (tweet_id, hashtag_id),
  foreign key (tweet_id) references tweets(id) on delete cascade,
  foreign key (hashtag_id) references hashtags(id) on delete cascade
);

create table replies (
  id uuid primary key,
  text text not null,
  user_id uuid not null,
  tweet_id uuid,
  reply_id uuid,
  foreign key (user_id) references profiles(id) on delete cascade,
  foreign key (tweet_id) references tweets(id) on delete cascade,
  foreign key (reply_id) references replies(id) on delete cascade
);

create table likes (
  id uuid primary key,
  user_id uuid not null,
  tweet_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint like_unique unique (user_id, tweet_id),
  foreign key (user_id) references profiles(id) on delete cascade,
  foreign key (tweet_id) references tweets(id) on delete cascade
);

create table bookmarks (
  id uuid primary key,
  user_id uuid,
  tweet_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint bookmark_unique unique (user_id, tweet_id),
  foreign key (user_id) references profiles(id) on delete cascade,
  foreign key (tweet_id) references tweets(id) on delete cascade
);

```
