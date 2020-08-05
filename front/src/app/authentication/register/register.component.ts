import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

const password = new FormControl('', [Validators.required]);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  errorStr = null;
  successMsg = null;
  isSpinnerVisible = false;
  constructor(private fb: FormBuilder, private router: Router,
              private _authService: AuthService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.errorStr = null;
    this.form = this.fb.group({
      first_name: [
        null,
        Validators.compose([])
      ],
      last_name: [
        null,
        Validators.compose([])
      ],
      username: [
        null,
        Validators.compose([Validators.required])
      ],
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: password,
      confirmPassword: confirmPassword
    });
    this.form.valueChanges.subscribe( (data) => {
      this.errorStr = null;
      this.successMsg = null;
    });
  }

  onSubmit() {
    this.successMsg = null;
    this.spinner.show();
    const postdata = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password};
    this._authService.signup(postdata)
        .subscribe(
            data => {
              this.spinner.hide();
                  if (data['success']) {
                    // this.router.navigate(['/forum']);
                    this.successMsg = "We have just sent you a verification message to your email, please check your inbox!"
                  } else {

                  }
                },
            error => {
              this.spinner.hide();
              const err = error['error'];
              if (err && err['error']) {
                for (let key in err['error']) {
                  if (err['error'].hasOwnProperty(key)) {
                      this.errorStr = key + " -> " + err['error'][key][0];
                      break;
                  }
                }
              }
            });
  }
}
