import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { environment } from './../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../_services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader ;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  constructor(private authService: AuthService,
  private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }
    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }
    initializeUploader() {
      this.uploader = new FileUploader({
        url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });
      this.uploader.onSuccessItem = (_item, response, status, headers ) => {
        if (response) {
          const res: Photo = JSON.parse( response );
          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.photos.push(photo);
          if (photo.isMain) {
            this.authService.changeMemberPhotoUrl(photo.url);
            this.authService.currentUser.photoUrl = photo.url;

          }
        }
      };
    }

    setMainPhoto(photo: Photo) {
      const nameid = this.authService.decodedToken.nameid;
       this.userService.setMainPhoto(nameid, photo.id).subscribe( () => {
        this.currentMain = _.findWhere(this.photos, {isMain: true});
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhotoUrl(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
       // localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

       }, error => {
         this.alertify.error(error);
       });
    }
    deletePhoto(id: number) {
      this.alertify.confirm('Are you sure to delete this photo', () => {
        this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe( () => {
          this.photos.slice(_.findIndex(this.photos, { id: id }), 1);
          this.alertify.success('Photo has been deleted');

        }, error => {
          this.alertify.error('Failed to delete photo');
        });
      });
    }

}
