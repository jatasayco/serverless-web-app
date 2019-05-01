import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.styl'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {
  posts:Array<any>
  data_json:String
  constructor(protected serv:PostsService) { }

  ngOnInit() {
    console.log("iniciando api");
    //this.serv.getPosts().subscribe(result => console.log(result.json()))
    this.serv.getPosts().subscribe(result => this.posts=result.json())
    console.log(this.posts)
  }

}
