import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    console.log(user);
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!user || !comparePassword) {
      return null;
    }

    return {
      userId: user.id,
      username: user.username,
      membership: user.membershipTier,
    };
  }

  async login(user: any) {
    const payload = {
      userId: user.userId,
      username: user.username,
      membership: user.membership,
    };

    const access_token = this.jwtService.sign(payload);

    return access_token;
  }
}
