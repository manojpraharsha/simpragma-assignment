import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagementService } from '../data-management.service';
import { Post } from '../posts';
import { Comment } from '../comment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetail: any[];
  commentsPostWise: any[];
  comments: Comment[] = [{
    postId: null,
    id: null,
    name: '',
    email: '',
    body: ''
  }];
  postDetail: Post[] = [{
    userId: null,
    id: null,
    title: '',
    body: '',
    comments: []
  }];

  constructor(private route: ActivatedRoute, private dataManagement: DataManagementService) {
  }

  ngOnInit() {
    this.dataManagement.getUserDetail(this.route.snapshot.params['id']).subscribe(user => {
      this.userDetail = user;
    });

    this.dataManagement.getUserPosts().subscribe(posts => {
      for (var post of posts) {
        if (post['userId'] == this.route.snapshot.params['id']) {
          var comments = this.getPostComments(post['id'])
          post.comments = comments;
          this.postDetail.push(post);
        }
      }
      console.log(this.postDetail);
    });

  }
  getPostComments(PostId: number) {
    var tempCOmments: any[] = [];
    this.dataManagement.getUserComments().subscribe(comments => {
      for (var comment of comments) {
        if (comment['postId'] == PostId) {
          // this.comments.push(comment)
          tempCOmments.push(comment)
        }
      }
      // console.log(tempCOmments);
      return tempCOmments;
    });
    return tempCOmments;
  }
  changeTab(tabele: string) {
    console.log(tabele);
    var t = document.getElementById(tabele);
    var all = document.getElementsByClassName('tabs');
    for (var i = 0; i < all.length; i++) {
      if (all[i].classList.contains('active')) {
        all[i].classList.remove('active');
      }
    }
    t.classList.add('active');
  }
}
