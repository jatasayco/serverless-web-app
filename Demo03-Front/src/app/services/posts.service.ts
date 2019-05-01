import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public url: string;
  constructor(private _http: Http ) { 
    this.url = 'https://jsonplaceholder.typicode.com/posts';
  }
  getPosts() {
    console.log("iniciando getposts");
    return this._http.get(this.url);
  }
}
