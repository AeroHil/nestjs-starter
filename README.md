## Getting Started

1. Create the project structure as shown above
2. Install dependencies:

```bash
npm install
```

3. Create the data directory for SQLite:

```bash
mkdir -p data
touch data/.gitkeep
```

4. Run the development server (using SQLite):

```bash
npm run start:dev
```

5. Run with test configuration (using PostgreSQL):

```bash
# Make sure PostgreSQL is running and the database exists
npm run start:test
```

6. Build and run for production:

```bash
npm run build
npm run start:prod
```

## Stack
- TypeScript
- NestJS
- Express HTTP server (default)
- TypeORM