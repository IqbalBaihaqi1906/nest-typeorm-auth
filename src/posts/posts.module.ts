import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from 'src/typeorm/entities/User';
import { Post } from 'src/typeorm/entities/Post';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
