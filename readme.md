The motivation for this code was for simple apps and quick prototypes. It builds on:  
* TypeORM
* ExpressJS
* TypeScript

The idea to is to be able to define Entities and automatically have API methods exposed. For instance, define a `Post` entity with a few columns and have these API endpoints available:  
* `GET /api/post/:id`: Get a single Post entity from the database by it's ID.
* `POST /api/post`: Insert a Post entity and have the object returned with any auto-generated IDs or dates.
* `PUT /api/post`: Update a Post entity.
* `DELETE /api/post/:id`: Delete a Post entity.
* `GET /api/post/list`: Query for an array of Post entities using the following Query String parameters:  
`?pageSize=10&page=2&orderBy=text&orderByDirection=asc&where=[{prop:"text",val:text3}]`  

The query will be filtered by anything in the `where` string. Paging and sorting is also available.


Simple example of a convention-based API that wraps TypeORM functionality.  

To run the project you'll need to create a `ormconfig.json` such as:

```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "*****",
  "password": "*****",
  "database": "typeapi",
  "synchronize": false,
  "logging": ["query", "error"],
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}

```

The docs for TypeORM are here: http://typeorm.io/  

The EpressJS extension is configured in `./typeAPI/index.ts`. It defines simple CRUD operations for each Entity defined in `./src/entity`.  
