import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material";
import {Topic} from "../../models/topic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  user: any;
  form: FormGroup;
  forums: any[] = [];
  topic: Topic;
  isSpinnerVisible = true;
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  play = true;
  topicId: number = null;
  timer: any;
  postTime = 10000; //ms
  constructor(private router: Router,
              private route: ActivatedRoute,
              private _postService: PostService,
              public snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.topic = new Topic();
    clearTimeout(this.timer);
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.form = this._formBuilder.group({
      content: [null, Validators.compose([Validators.required])]
    });
    this.route.params.subscribe(params => {
      if (params['topic']) {
        this.topicId = params['topic'];
        this.increaseCount();
        this.getTopic();
        this.timer = setInterval(() => {
          this.getTopic();
        }, this.postTime);

      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  increaseCount() {
    this._postService.increaseCount(this.topicId)
        .subscribe(
            res => {
              this.isSpinnerVisible = false;

            }, error => {
              this.isSpinnerVisible = false;
            });
  }

  getTopic() {
    this._postService.getTopic(this.topicId)
        .subscribe(
            res => {
              this.isSpinnerVisible = false;
              if (res['success']) {
                this.topic = res['data'];
              }
            }, error => {
              this.isSpinnerVisible = false;
              this.goBack();
              this.snackBar.open('Error Added!', 'Close', {
                duration: 5000,
                panelClass: 'blue-snackbar'
              });
            });
  }
  setPage(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData(this.pageIndex, this.pageSize);
  }

  onReply() {
    if (!this.form.controls['content'].value) {
      window.alert('you must input post data')
    }

    const postdata = {
      user_id: this.user.id,
      discussion_id: this.topic.id,
      content: this.form.controls['content'].value
    };
    this._postService.addPost(postdata)
        .subscribe(
            res => {
              this.snackBar.open('Success Added!', 'Close', {
                duration: 5000,
                panelClass: 'blue-snackbar'
              });
              this.ngOnInit();
            }, error => {
              let err = 'Error Added!';
              if (error['error']) {
                err = error['error'].error;
              }
              this.snackBar.open(err, 'Close', {
                duration: 7000,
                panelClass: 'blue-snackbar'
              });
            });

  }

  setPageData(pageIndex, pageSize) {
    // this.forums = _.orderBy(this.reports, [this.sortName], [this.sortDirection]);
    // this.dataSource.data = this.forums.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }

  onPlay(flag) {
    this.play = flag;
    if (!this.play) {
      clearTimeout(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.getTopic();
      }, this.postTime);
    }
  }

  goToUser(data) {
    this.router.navigate(['/forum/users/' + data.user_id]);
  }

  ngOnDestroy(){
    clearTimeout(this.timer);
  }
}
