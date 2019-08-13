import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }

  public submit() {
  const vm = this;

  vm.auth.login(vm.email, vm.password)
  .pipe(first())
  .subscribe(
    result => vm.router.navigate(['/home']),
    err => vm.error = 'Could not authenticate'
  );
  // console.log('vm', vm);
}
  ngOnInit() {
  }

}
