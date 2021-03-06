import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/pages/interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input("posts")  posts: Post[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

}
