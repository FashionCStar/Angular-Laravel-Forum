import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
import {NgxSpinnerService} from "ngx-spinner";
import {UsersService} from "../../../services/users.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public form: FormGroup;
  user: User;
  height = 300;
  avataURL: any = null;
  imageFile: any;
  isSpinnerVisible = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private _usersService: UsersService,
              private spinner: NgxSpinnerService,
              public snackBar: MatSnackBar) {


  }

  ngOnInit() {
    this.fileInput.nativeElement.value = '';
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.height = window.innerHeight-140;
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      // username: [this.user.username, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, CustomValidators.email])],
      first_name: [this.user.first_name, Validators.compose([])],
      last_name: [this.user.last_name, Validators.compose([])],
      phone: [this.user.phone, Validators.compose([])],
    });
  }

  onSubmit() {
    this.spinner.show();
    const updateuser = {
      id: this.user.id,
      email: this.form.value.email,
      username: this.form.value.username,
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      phone: this.form.value.phone
    };
    this._usersService.updateUser(updateuser)
        .subscribe(
            data => {
              this.spinner.hide();
              if (data['success']) {
                localStorage.setItem('profile', JSON.stringify(data['user']));
                this._usersService.setUser(data['user']);
                if (this.imageFile) {
                  const formData: FormData = new FormData();
                  formData.append( 'file', this.imageFile);
                  this._usersService.uploadPhoto(this.user.id, formData)
                      .subscribe(
                          data => {
                            console.log('dddddd', data['user'])
                            this.imageFile = null;
                            localStorage.setItem('profile', JSON.stringify(data['user']));
                          },
                          error => {
                            this.spinner.hide();
                          });
                }
              } else {

              }
            },
            error => {
              // const err = error['error'];
              this.spinner.hide();
            });
  }

  async selectimage(event): Promise<void> {
    this.imageFile = event.target.files.item(0);
    this.avataURL = await this.getBase64(event.target.files.item(0));
  }

  async getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
