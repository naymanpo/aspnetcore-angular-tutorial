import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @Input()valuesFromHome: any;
  @Output()cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  constructor(private authservice: AuthService ,
     private alertifyService: AlertifyService,
     private fb: FormBuilder,
     private router: Router) { }

  ngOnInit() {
      this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    { validator: this.passwordMatchValidator });
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authservice.register(this.user).subscribe(
        () => {
          this.alertifyService.success('Register Successfully');
        }, error => {
          this.alertifyService.error(error);
        }, () => {
          this.authservice.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
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
