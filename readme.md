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

The motivation for this code was for simple apps and quick prototypes.
