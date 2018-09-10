import { PreventUnsaveChangesGuard } from './_guard/prevent-unsave-changes.gaurd';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './routes';
import { MemberListComponent } from './member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { ListsComponent } from './lists/lists.component';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MessageComponent,
      ListsComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      AuthModule,
       TabsModule.forRoot(),
       NgxGalleryModule,
       FileUploadModule,
       ReactiveFormsModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberEditResolver,
      PreventUnsaveChangesGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
