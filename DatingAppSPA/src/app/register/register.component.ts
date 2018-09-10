import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input()valuesFromHome: any;
  @Output()cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  constructor(private authservice: AuthService , private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)] ),
      confirmPasword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator );
  }
  register() {
    // this.authservice.register(this.model)
    // .subscribe( () => {
    //   this.alertifyService.success('Register successfully');
    // }, error => {
    //   this.alertifyService.error(error);
    // });
    console.log(this.registerForm.value);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true };
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
