import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { CustomValidators } from 'ng2-validation';
import { Location } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConfirmDlgComponent} from "../../forum/confirm-dlg/confirm-dlg.component";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  errorStr = null;
  constructor(private fb: FormBuilder, private router: Router,
              private _authService: AuthService, private location: Location,
              public dialogRef: MatDialogRef<LoginComponent>,
              private _usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.errorStr = null;
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.form.valueChanges.subscribe( (data) => {
      this.errorStr = null;
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this._authService.login(this.form.value.email, this.form.value.password)
        .subscribe(
            data => {
              if (data['success']) {
                localStorage.setItem('token', data['token']);
                localStorage.setItem('profile', JSON.stringify(data['user']));
                this._usersService.setUser(data['user']);
                this.dialogRef.close(true);
              } else {

              }
            },
            error => {
              const err = error['error'];
              if (err && err['error']) {
                this.errorStr = err['error'];
              }
            });
  }

  onforgot() {
    this.dialogRef.close(false);
    this.router.navigate(['/authentication/forgot']);
  }
}
