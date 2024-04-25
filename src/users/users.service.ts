import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { ICreateUserInput, IUpdateUserInput } from './UserInterface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async createUser(userData: ICreateUserInput) {
    const hashPassword = bcrypt.hashSync(userData.password, 8);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashPassword,
    });
    const saveUser = await this.userRepository.save(newUser);

    return saveUser;
  }

  async updateUserById(id: number, userData: IUpdateUserInput) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    console.log('User', user);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const updateUser = await this.userRepository.update({ id }, userData);

    return updateUser;
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const deletedUser = await this.userRepository.delete({ id });

    return deletedUser;
  }
}
