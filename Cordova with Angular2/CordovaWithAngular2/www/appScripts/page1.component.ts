import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'users-home',
  template: `Page1 Component Loaded`
})
export class Page1Component {
  constructor(params: RouteParams) {
     
  }
}
