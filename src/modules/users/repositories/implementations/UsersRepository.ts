import { request } from "express";
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userRepository = new User();

    Object.assign(userRepository, { name, email });

    this.users.push(userRepository);

    return userRepository;
  }

  findById(id: string): User | undefined {
    const indexUserRepository = this.users.findIndex(
      (userRepository) => userRepository.id === id
    );

    return this.users[indexUserRepository];
  }

  findByEmail(email: string): User | undefined {
    const userRepository: User = this.users.find(
      (userRepo) => userRepo.email === email
    );

    return userRepository;
  }

  turnAdmin(receivedUser: User): User {
    const indexUserRepository = this.users.indexOf(receivedUser);

    this.users[indexUserRepository].admin = true;
    this.users[indexUserRepository].updated_at = new Date();

    return this.users[indexUserRepository];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
