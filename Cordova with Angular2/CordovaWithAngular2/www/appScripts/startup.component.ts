import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'startup',
    template: ''
})
export class StartupComponent {
    constructor(private _router: Router) {
        //here decide , whether user already logedin or not
        //if not then navigate to login page else to some where else
        _router.navigate(['Login']);
    }
}