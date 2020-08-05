import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class RolesGuardService {

  role = '';

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
        this.role = user.role;
    }
    if (this.role === 'admin') {
      return true;
    }
    // const checkroles = route.data['roles'];
    // if (checkroles) {
    //     const checkRole = checkroles.some((role) => {
    //         return this.roles.indexOf(role) !== -1;
    //     });
    //     if (checkRole) {
    //       return true;
    //     }
    // }
      this.router.navigate(['/forum']);
      return false;
  }
}
