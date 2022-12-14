import { validate } from "uuid";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    let user: User = this.usersRepository.findByEmail(email);
    if (user) {
      throw new Error("User already exists with entered email.");
    }

    user = this.usersRepository.create({name, email});
    
    if ( !(validate(user.id)) ) {
      throw new Error("Entered Id is not valid.")
    };

    return user;
  }
}

export { CreateUserUseCase };
