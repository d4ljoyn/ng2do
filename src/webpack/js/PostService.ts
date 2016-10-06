import {Inject, Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PostService {

  constructor(@Inject(Http) public http: Http) {
    this.http = http; // http is an instance of the main Http class
  }
  getAllPosts() {
    return this.http.get("/posts")
      .map((res) => {
        return res.json();
      });
  }
  createNewPost(data: any) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json"); // Set JSON header so that data is parsed by bodyParser on the backend
    return this.http.post("/posts", JSON.stringify(data), {
      headers: headers
    }).map((res) => {
      return res.json();
    });
  }
  updatePost(id: string, data: any) {
    return this.http.put("/posts/" + id, data)
      .map((res) => {
        return res.json();
      });
  }
  deletePost(id: string) {
    return this.http.delete("/posts/" + id)
      .map((res) => {
        return res.json();
      });
  }
}
