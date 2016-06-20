import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {StartupComponent} from './startup.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', component: StartupComponent, name: 'StartUp' },
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/fts/...', component: HomeComponent, name: 'Home' }
])

export class AppComponent {
}