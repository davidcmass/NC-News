# NC News Back-End

This is the back-end repository for the NC News project. It provides a RESTful API for the nc-news-fe (front-end) application.

## Key Features

- Filter articles by category.
- Vote on articles.
- Post comments.
- Delete comments.
- Vote on comments.

## Setup

1. Clone this repository.
2. Install the necessary dependencies by running `npm install`.
3. Set up the required environment variables in `.env` files.
4. Run `npm run setup-dbs` to set up the databases.
5. Run `npm run seed` to seed the databases.

### Environment Variables

Create two `.env` files:

- `.env.test`
- `.env.development`

Add the following to each file:

```js
PGDATABASE=<database_name_here>
```

Replace `<database_name_here>` with the appropriate database names:

- nc_news_test
- nc_news

## Testing

Run `npm test` to run the tests and ensure everything is functioning correctly.
