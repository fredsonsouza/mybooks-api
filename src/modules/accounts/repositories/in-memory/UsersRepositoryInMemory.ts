import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUserRepository } from '../IUserRepository';

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    registration_number,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      registration_number,
    });
    this.users.push(user);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}
export { UsersRepositoryInMemory };
