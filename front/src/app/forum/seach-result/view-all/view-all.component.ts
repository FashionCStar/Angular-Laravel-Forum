import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  term = null;
  type = 'user';
  users = [];
  topics = [];
  totalCount: number = 0;
  pageIndex: number = 0;
  pageSize: number = 15;
  isSpinnerVisible = true;
  constructor(private router: Router, private route: ActivatedRoute,
              private _postService: PostService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.term = params['term'];
      this.type = params['type'];
      const param = {
        term: this.term,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.setPageData(param);
    })
  }

  setPage(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const param = {
      term: this.term,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.setPageData(param);
  }

  setPageData(param) {
    if (this.type === 'user') {
      this._postService.getAllUser(param)
          .subscribe(
              res => {
                this.isSpinnerVisible = false;
                if (res['success']) {
                  this.users = res['users'];
                  this.totalCount = res['usercount'];
                }
              }, error => {
                this.isSpinnerVisible = false;
              });
    } else if (this.type === 'forum') {
      this._postService.getAllTopic(param)
          .subscribe(
              res => {
                this.isSpinnerVisible = false;
                if (res['success']) {
                  this.topics = res['topics'];
                  this.totalCount = res['topiccount'];
                }
              }, error => {
                this.isSpinnerVisible = false;
              });
    }
  }

}
