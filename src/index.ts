import 'reflect-metadata';  // Required for decorators
import Koa, { DefaultContext, DefaultState } from 'koa';
import { appDataSource } from './database/UserDataSource';  // Import the DataSource
import { Container } from 'typedi';
import { UserController } from './controllers/UserController';
import { createKoaServer, useContainer } from 'routing-controllers';
import koaBody from 'koa-body';  // Import koa-body for parsing request bodies


useContainer(Container);

// Initialize the database connection
async function startApp() {
  try {
    // Initialize the data source for SQLite
    await appDataSource.initialize();
    console.log('Database connected successfully');

    // Start the Koa application after initializing the database
    const app: Koa<DefaultState, DefaultContext> = createKoaServer({
      controllers: [UserController],
    });


    const userController = Container.get(UserController);  // TypeDI handles dependency injection

    // Use routes from the controller
    app.use(userController.router.routes());
    app.use(userController.router.allowedMethods());

    // Use koa-body for parsing request
    app.use(koaBody());


    app.listen(3000).on('listening', () => console.log(`Server is running at http://localhost:3000`));
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

startApp()

