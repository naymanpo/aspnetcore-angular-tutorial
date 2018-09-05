import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input()valuesFromHome: any;
  @Output()cancelRegister = new EventEmitter();
  constructor(private authservice: AuthService , private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  register() {
    this.authservice.register(this.model)
    .subscribe( () => {
      this.alertifyService.success('Register successfully');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
