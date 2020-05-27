import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/Users';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllProviders({
    user_exception_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (user_exception_id) {
      users = this.users.filter(user => user.id !== user_exception_id);
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUserRepository;
