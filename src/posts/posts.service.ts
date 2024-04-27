import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Repository } from 'typeorm';
import { ICreatePostInput, IUpdatePostInput } from './PostInterface';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class PostsService {
  @InjectRepository(Post)
  private postRepository: Repository<Post>;
  @InjectRepository(User) private userRepository: Repository<User>;

  async createPost(userId: number, postData: ICreatePostInput) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    console.log(user);

    if (!user) throw new HttpException('User not found', 404);

    const newPost = this.postRepository.create({
      ...postData,
      user,
    });
    const savePost = await this.postRepository.save(newPost);

    return savePost;
  }

  async getPosts() {
    const posts = await this.postRepository.find({
      relations: {
        user: true,
      },
    });

    return posts;
  }

  async updatePostById(id: number, updatePostData: IUpdatePostInput) {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) throw new HttpException('Post not found', 404);

    const updatedPost = await this.postRepository.save({
      ...post,
      ...updatePostData,
    });

    return updatedPost;
  }
}
