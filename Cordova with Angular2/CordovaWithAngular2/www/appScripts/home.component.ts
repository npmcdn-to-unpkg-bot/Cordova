import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Page1Component} from './page1.component';
import {Page2Component} from './page2.component';

@Component({
  template: `
  Home Page<br>
  <a [routerLink]="['./Page1']">Profile</a> |
  <a [routerLink]="['./Page2', {id: 1234}]">Page2</a><br>
  <br><br>
  <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', component: Page1Component, name: 'Page1' },
  { path: '/:id/page2', component: Page2Component, name: 'Page2' }
])

export class HomeComponent {
}
