import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from "../../models/user";
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UsersService} from "../../services/users.service";
import {ConfirmDlgComponent} from '../confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  displayedColumns = ['username', 'email', 'option'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _usersService: UsersService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(page = null): void {
    this._usersService.getUsers()
        .subscribe(data => {
          this.users = data['userdata'];
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
          this.users = [...this.users];
        }, error => {
          console.log('Error get user', error);
        });
  }

  addNewUser() {

  }

  toggleStar(user: User) {
    if ( user.is_activated == 1 )
    {
      user.is_activated = 0;
    }
    else
    {
      user.is_activated = 1;
    }
    this._usersService.activeUser(user.id, user.is_activated)
        .subscribe(data => {

        }, error => {
          console.log('Error get user', error);
        });
  }
  editData(user: User) {
    // const dialogRef = this.dialog.open(ProductFormComponent, {
    //   width: '600',
    //   // height: '90vh',
    //   data: {product: Object.assign({}, product)}
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.snackBar.open('Success Updated!', 'Close', {
    //       duration: 5000,
    //       panelClass: 'blue-snackbar'
    //     });
    //     if (result['product']) {
    //       this.ngOnInit();
    //     }
    //   }
    // });
  }

  deleteData(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '350px',
      height: '150px',
      panelClass: 'custom-modalbox',
      data: {msg: 'Are you sure delete it?'}
    });

    dialogRef.afterClosed().subscribe(accept => {
      if (accept) {
        this._usersService.delUser(user.id)
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
}
