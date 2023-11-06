import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './schemas/posts.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule,
    MongooseModule.forFeature([{name:Posts.name, schema: PostsSchema}])
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}