import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {PostService} from "../../services/post.service";
import {User} from "../../models/user";
import {ConfirmDlgComponent} from "../confirm-dlg/confirm-dlg.component";
import * as _ from 'lodash';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.scss']
})
export class CricketComponent implements OnInit {

  isSpinnerVisible = true;
  user: any;
  forums: any[] = [];
  columns = [{ prop: 'title' }, { name: 'content' }];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns = ['title', 'author', 'posts', 'view_count', 'latestpost', 'option'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private route: ActivatedRoute,
              private _postService: PostService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('profile'));
    // this.forums = [{title: 'Hi! it is test problem', content: 'this is test1'}, {title: 'test3', content: 'this is test3'},
    //     {title: 'Hi! it is second test problem', content: 'this is test1 polpolpol!!!'}, {title: 'test5', content: 'this is test1'}];
  }

  ngOnInit() {
    // this.router.events
    //     .pipe(filter((e: any) => e instanceof NavigationEnd),
    //         pairwise()
    //     ).subscribe((e: any) => {
    //   console.log('ddd', e[0].urlAfterRedirects); // previous url
    // });
    this.getDatas( null);
    // this.dataSource.data = this.forums;
  }

  private getDatas( page = null): void {
    this._postService.getTopics('cricket')
        .subscribe(data => {
          this.isSpinnerVisible = false;
          this.forums = data['data'];
          this.dataSource = new MatTableDataSource(this.forums);
          this.dataSource.sort = this.sort;
          this.forums = [...this.forums];
        }, error => {
          this.isSpinnerVisible = false;
          console.log('Error get topic', error);
        });
  }

  setPage(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData(this.pageIndex, this.pageSize);
  }

  setPageData(pageIndex, pageSize) {
    // this.reports = _.sortBy(this.reports, ['reportDate', 'asc']); // Sort by reportDate
    // this.forums = _.orderBy(this.reports, [this.sortName], [this.sortDirection]);
    this.dataSource.data = this.forums.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }

  onRate(event) {

  }
  deleteData(topic: any): void {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '350px',
      height: '150px',
      panelClass: 'custom-modalbox',
      data: {msg: 'Are you sure delete it?'}
    });

    dialogRef.afterClosed().subscribe(accept => {
      if (accept) {
        this._postService.delTopic(topic.id)
            .subscribe(
                data => {
                  this.ngOnInit();
                  this.snackBar.open('Success Deleted!', 'Close', {
                    duration: 5000,
                    panelClass: 'blue-snackbar'
                  });
                }, error => {
                  this.snackBar.open('Error Delete!', 'Close', {
                    duration: 5000,
                    panelClass: 'blue-snackbar'
                  });
                });
      }
    });
  }
  onCreateTopic() {
    this.router.navigate(['/forum/cricket/topic']);
  }

  goToUser(data) {
    this.router.navigate(['/forum/users/' + data.user_id]);
  }

  resetSort(event) {
    this.forums = _.orderBy(this.forums, [event.active], [event.direction]);
    this.dataSource = new MatTableDataSource(this.forums);
  }

  checkToday(date) {
    const last_date = new Date(date);
    const diff = ((new Date()).getTime() - last_date.getTime()) / 1000;
    const daydiff = diff / 86400;
    if (daydiff > 1) {
      return false;
    } else {
      return true;
    }
  }
}