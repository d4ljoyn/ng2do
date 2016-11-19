import {Inject, Injectable} from "@angular/core";
import {Component } from "@angular/core";
import {PostService} from "./PostService";

@Component( {
  selector: "post-app",
  providers: [PostService],
  templateUrl: "templates/PostComponent",
})
@Injectable()
export class PostComponent {
  public posts: any;
  public postData: any;
  constructor(@Inject(PostService) public postService : PostService) {
    this.posts = [];
    this.postData = {
      text: ""
    };
    this.postService = postService;
    this.postService.getAllPosts()
      .subscribe((res) => {
        this.posts = res;
      });
  }
  createPost() {
    this.postService.createNewPost(this.postData)
      .subscribe((res) => {
        this.posts = res;
        this.postData.text = "";
      });
  }
  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe((res) => {
        this.posts = res;
      });
  }
};


