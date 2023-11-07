import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './modules/create-post/create-post.component';
import { ExplorePostComponent } from './modules/explore-post/explore-post.component';
import { PostFavoritesComponent } from './modules/post-favorites/post-favorites.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatePostComponent,
    ExplorePostComponent,
    PostFavoritesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
