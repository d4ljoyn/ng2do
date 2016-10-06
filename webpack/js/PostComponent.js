"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require("@angular/core");
const core_2 = require("@angular/core");
const PostService_1 = require("./PostService");
let PostComponent = class PostComponent {
    constructor(postService) {
        this.postService = postService;
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
    deletePost(id) {
        this.postService.deletePost(id)
            .subscribe((res) => {
            this.posts = res;
        });
    }
};
PostComponent = __decorate([
    core_2.Component({
        selector: "post-app",
        providers: [PostService_1.PostService],
        templateUrl: "templates/PostComponent",
    }),
    core_1.Injectable(),
    __param(0, core_1.Inject(PostService_1.PostService))
], PostComponent);
exports.PostComponent = PostComponent;
;
