import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './PostDtos';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post(':userId')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() CreatePostData: CreatePostDto,
  ) {
    const savedPost = await this.postService.createPost(userId, CreatePostData);

    return savedPost;
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postService.getPosts();

    return posts;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePostById(
      id,
      updatePostData,
    );
    return updatedPost;
  }
}
