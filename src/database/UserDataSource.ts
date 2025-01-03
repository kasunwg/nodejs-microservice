import { DataSource } from 'typeorm';
import { User } from '../entities/User';

// Create a DataSource instance for TypeORM connection
export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'user.sqlite',  // Your database name
  synchronize: true,  // Synchronize schema on startup
  logging: false,
  entities: [User],  // List of entities (models) to use in the database
  migrations: [],
  subscribers: []
});
