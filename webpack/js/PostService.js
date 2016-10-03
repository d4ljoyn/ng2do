"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
let PostService = class PostService {
    constructor(http) {
        this.http = http;
        this.http = http;
    }
    getAllPosts() {
        return this.http.get("/posts")
            .map((res) => {
            return res.json();
        });
    }
    createNewPost(data) {
        let headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post("/posts", JSON.stringify(data), {
            headers: headers
        }).map((res) => {
            return res.json();
        });
    }
    updatePost(id, data) {
        return this.http.put("/posts/" + id, data)
            .map((res) => {
            return res.json();
        });
    }
    deletePost(id) {
        return this.http.delete("/posts/" + id)
            .map((res) => {
            return res.json();
        });
    }
};
PostService = __decorate([
    core_1.Injectable()
], PostService);
exports.PostService = PostService;
