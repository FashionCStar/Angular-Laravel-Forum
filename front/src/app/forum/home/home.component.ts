import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {UsersService} from "../../services/users.service";
import {LoginComponent} from "../../authentication/login/login.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSpinnerVisible = true;
  big_posts_forums: any[] = [];
  football_forums: any[] = [];
  criket_forums: any[] = [];
  tennis_forums: any[] = [];
  rugby_forums: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute,
              private _postService: PostService,
              private _usersService: UsersService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService
              ) {

  }

  private getLatestTopics(): void {
    this._postService.getLatestTopics()
        .subscribe(res => {
          this.spinner.hide();
          this.isSpinnerVisible = false;
          if (res['success']) {
            this.football_forums = res['football'];
            this.criket_forums = res['cricket'];
            this.tennis_forums = res['tennis'];
            this.rugby_forums = res['rugby'];
            this.big_posts_forums = res['big'];
          }

        }, error => {
          this.spinner.hide();
          this.isSpinnerVisible = false;
          console.log('Error get topics', error);
        });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
      if (this.router.url === '/forum') {
        // window.location.reload();
      } else {
        this.isSpinnerVisible = true;
        // this.spinner.show();
        this._usersService.verifyUserEmail(this.router.url)
            .subscribe(res => {
              this.spinner.hide();
              if(res['success']) {
                const dialogRef = this.dialog.open(LoginComponent, {
                  width: '450px',
                  height: '430px',
                  panelClass: 'custom-modalbox'
                });
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.router.navigate(['/forum']);
                  }
                })
              } else {

              }
              this.snackBar.open(res['msg'], 'Close', {
                duration: 5000,
                panelClass: 'blue-snackbar'
              });
              this.isSpinnerVisible = false;
            }, error => {
              this.spinner.hide();
              this.isSpinnerVisible = false;
              console.log('User email is wrong', error);
            });
      }
    // });

    this.getLatestTopics();
    // if (this.router.url.length > 20) {
    //   this.isSpinnerVisible = true;
    //   // this.spinner.show();
    //   this._usersService.verifyUserEmail(this.router.url)
    //       .subscribe(res => {
    //         this.spinner.hide();
    //         if(res['success']) {
    //           const dialogRef = this.dialog.open(LoginComponent, {
    //             width: '450px',
    //             height: '430px',
    //             panelClass: 'custom-modalbox'
    //           });
    //           dialogRef.afterClosed().subscribe(result => {
    //             if (result) {
    //               this.router.navigate(['/forum']);
    //             }
    //           })
    //         } else {
    //
    //         }
    //         this.snackBar.open(res['msg'], 'Close', {
    //           duration: 5000,
    //           panelClass: 'blue-snackbar'
    //         });
    //         this.isSpinnerVisible = false;
    //       }, error => {
    //         this.spinner.hide();
    //         this.isSpinnerVisible = false;
    //         console.log('User email is wrong', error);
    //       });
    //
    // }
  }

}
