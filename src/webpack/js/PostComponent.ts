// webpack/js/TodoComponent.js
import {Component } from "@angular/core"; // Import Component and View constructor (for metadata)
import {PostService} from "./PostService";

@Component( {
  selector: "post-app",
  providers: [PostService],
  templateUrl: "templates/PostComponent",
})

export class PostComponent {
  private posts: any;
  private postData: any;
  constructor(public postService : PostService) {
    this.posts = [];
    this.postData = {
      text: ""
    };
    this.postService = postService;
    this.postService.getAllPosts()
    // Rxjs, we subscribe to the response
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


