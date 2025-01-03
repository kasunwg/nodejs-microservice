import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { User } from '../entities/User';  // Import the User entity
import { appDataSource } from '../database/UserDataSource';

@Service()  // Mark this class as injectable
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    // Get the repository directly from AppDataSource
    this.userRepository = appDataSource.getRepository(User);
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find(); // Retrieve all users from the database
  }

  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Create a new user
  async createUser(name: string, email: string): Promise<User> {
    const newUser = this.userRepository.create({ name, email });
    return this.userRepository.save(newUser);
  }
}
