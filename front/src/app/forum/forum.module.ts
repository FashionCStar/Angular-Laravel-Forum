import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RatingModule } from 'ng-starrating';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { QuillModule } from 'ngx-quill';
import { ForumRoutes } from './forum.routing';

import { FootballComponent } from './football/football.component';
import { CricketComponent } from './cricket/cricket.component';
import { TennisComponent } from './tennis/tennis.component';
import { RagbiComponent } from './ragbi/ragbi.component';
import { DemoMaterialModule } from '../demo-material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersComponent } from './users/users.component';
import { TopicComponent } from './topic/topic.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SeachResultComponent } from './seach-result/seach-result.component';
import {RolesGuardService} from "../services/roles-guard.service";
import {AuthGuard} from "../services/auth.guard";
import { ViewAllComponent } from './seach-result/view-all/view-all.component';
import { MyProfileComponent } from './users/my-profile/my-profile.component';

@NgModule({
  declarations: [FootballComponent, CricketComponent, TennisComponent, RagbiComponent, UsersComponent, TopicComponent, ContactUsComponent, HomeComponent, PostComponent, ProfileComponent, VerifyUserComponent, SeachResultComponent, ViewAllComponent, MyProfileComponent],
  imports: [
      CommonModule,
      RouterModule.forChild(ForumRoutes),
      MatIconModule,
      MatCardModule,
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      DemoMaterialModule,
      NgxDatatableModule,
      RatingModule,
      ReCaptchaModule,
      QuillModule,
      NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
    RolesGuardService
  ]
})
export class ForumModule { }
