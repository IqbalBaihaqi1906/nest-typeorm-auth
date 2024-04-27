import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, CreateUserProfileDto, UpdateUserDto } from './UserDtos';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Req() req: Request) {
    console.log(req.user);

    const user = await this.userService.getAllUsers();

    return user;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);

    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userData: CreateUserDto) {
    if (userData.password !== userData.confirmPassword) {
      throw new HttpException(
        'Password and Confirm Password do not match',
        400,
      );
    }
    const newUser = await this.userService.createUser(userData);

    return newUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    const updateUser = await this.userService.updateUserById(id, userData);

    return updateUser;
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.userService.deleteUserById(id);

    return deletedUser;
  }

  @Post(':id/profiles')
  @UsePipes(new ValidationPipe())
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileData: CreateUserProfileDto,
  ) {
    const userProfile = await this.userService.createUserProfile(
      id,
      profileData,
    );

    return userProfile;
  }
}
