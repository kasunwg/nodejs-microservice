import { Context } from 'koa';
import Router from 'koa-router';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/UserService';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


@Service()  // Mark this class as injectable
export class UserController {
  public router: Router;

  @Inject() private userService: UserService;  // Inject UserService

  constructor() {
    this.router = new Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/users', this.getAllUsers.bind(this)); // Add route for all users
    this.router.get('/users/:id', this.getUserById.bind(this));
    this.router.post('/users', this.createUser.bind(this));  // POST route to create a user
  }

  // Get user by ID
  async getUserById(ctx: Context) {
    const userId = parseInt(ctx.params.id);
    const user = await this.userService.getUserById(userId);

    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
    }
  }

    // Get all users
    async getAllUsers(ctx: Context) {
      try {
        const users = await this.userService.getAllUsers();
        ctx.body = users; // Return all users in the response body
      } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
        console.error(error);
      }
    }

  // Create a new user
  async createUser(ctx: Context) {

    const body: CreateUserDTO = plainToClass(CreateUserDTO, ctx.request.body);

    // Validate the incoming body data
    const errors = await validate(body);

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = { message: 'Validation failed', errors };
      return;
    }

    try {
      const user = await this.userService.createUser(body.name, body.email);
      ctx.status = 201;
      ctx.body = user;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
      console.error(error);
    }
  }
}
