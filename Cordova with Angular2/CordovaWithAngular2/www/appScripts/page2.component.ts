import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'user-stats',
  template: `
Page2 Component loaded with id : {{ id }}
  `
})
export class Page2Component {
  id:string;
  constructor(params: RouteParams) {
    this.id = params.get('id');
  }
}
