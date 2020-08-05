import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  checkBot = false;
  public form: FormGroup;
  constructor(private fb: FormBuilder,
              private _postService: PostService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      subject: [null, Validators.compose([Validators.required])],
      content: [null, Validators.compose([Validators.required])]
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    if (captchaResponse) {
      this.checkBot = true;
    }

  }

  onSubmit() {
    const formdata = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      subject: this.form.controls['subject'].value,
      content: this.form.controls['content'].value,
    };
    this._postService.sendToContact(formdata)
        .subscribe(
            res => {
              this.snackBar.open('Success Sent!', 'Close', {
                duration: 5000,
                panelClass: 'blue-snackbar'
              });
              // this.checkBot = false;
            }, error => {
              this.snackBar.open('Error Sent!', 'Close', {
                duration: 5000,
                panelClass: 'blue-snackbar'
              });
              // this.checkBot = false;
            });
  }
}
