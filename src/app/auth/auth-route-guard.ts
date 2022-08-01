import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            this._router.navigate(['/auth/signin']);
            return false;
        }

        if (!route.data || !route.data['permission']) {
            return true;
        }
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
