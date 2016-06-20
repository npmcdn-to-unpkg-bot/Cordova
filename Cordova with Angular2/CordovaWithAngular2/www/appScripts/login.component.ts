import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

@Component({
  selector: '`login',
  templateUrl: 'appScripts/login.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {

  constructor(private _router: Router) {

    //_router.navigate(['/Home/Page1']);
  }
}
