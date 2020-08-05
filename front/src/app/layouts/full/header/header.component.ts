import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import { LoginComponent } from '../../../authentication/login/login.component';
import {MatDialog} from "@angular/material";
import { Subscription } from 'rxjs/Subscription';
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  // This is for Notifications
  subscription: Subscription;
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  user: any;
  constructor(
      private router: Router, private _authService: AuthService,
      public dialog: MatDialog,
      private _usersService: UsersService
  ) {
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.subscription = this._usersService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  onLogin() {
    // this.router.navigate(['/authentication/login']);
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      height: '430px',
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    })

  }
  onRegister() {
    this.router.navigate([]).then(result => {  window.open('/authentication/register', '_blank'); });
  }

  onContactUs() {
    this.router.navigate(['/forum/contact-us']);
  }

  onProfile() {
    this.router.navigate(['/forum/profile']);
  }

  logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('profile');
    // this.router.navigate(['/forum']);
    // window.location.reload();

    // this.user = JSON.parse(localStorage.getItem('profile'));
    this._authService.logout(this.user.id)
        .subscribe(
            data => {
              localStorage.removeItem('token');
              localStorage.removeItem('profile');
              window.location.reload();
            },
            error => {

            });
  }
}
