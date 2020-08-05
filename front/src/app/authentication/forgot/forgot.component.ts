import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  successMsg: string = null;
  errorStr = null;
  constructor(private fb: FormBuilder, private router: Router,
              private _authService: AuthService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.successMsg = null;
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
    this.form.valueChanges.subscribe( (data) => {
      this.errorStr = null;
      this.successMsg = null;
    });
  }

  onSubmit() {
    this.spinner.show();
    this.successMsg = null;
    this.errorStr = null;
    this._authService.forgot(this.form.value.email)
        .subscribe(
            data => {
              this.spinner.hide();
              this.successMsg = "We just sent password reset link to your email, please check your inbox!"
            },
            error => {
              this.spinner.hide();
              this.errorStr = 'This user does not exist!';
            });
  }
}
