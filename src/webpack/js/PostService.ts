import {Inject, Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Rx";


@Injectable()
export class PostService {

  constructor(@Inject(Http) public http: Http) {
    this.http = http; // http is an instance of the main Http class
  }
  getAllPosts() {
    return this.http.get("/api/posts")
      .map((res) => {
        return res.json();
      }).catch((error: any) => Observable.throw(error.json().error || "Server error"));

  }
  createNewPost(data: any) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json"); // Set JSON header so that data is parsed by bodyParser on the backend
    return this.http.post("/api/posts", JSON.stringify(data), {
      headers: headers
    }).map((res) => {
      return res.json();
    });
  }
  updatePost(id: string, data: any) {
    return this.http.put("/api/posts/" + id, data)
      .map((res) => {
        return res.json();
      });
  }
  deletePost(id: string) {
    return this.http.delete("/api/posts/" + id)
      .map((res) => {
        return res.json();
      });
  }
}
