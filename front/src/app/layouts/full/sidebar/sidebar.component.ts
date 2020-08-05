import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import {UsersService} from "../../../services/users.service";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  status: boolean = false;
  sidemenus: any[] = [];
  user: any;
  subscription: Subscription;
  clickEvent() {
    this.status = !this.status;
  }

  subclickEvent() {
    this.status = true;
  }
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _usersService: UsersService,
    public menuItems: MenuItems
  ) {
    this.sidemenus = menuItems.getMenuitem();
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.subscription = this._usersService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        const separatemenu = this.sidemenus.find(m => m.name === 'Manage');
        if (!separatemenu) {
          const newmenu =    {
            state: '',
            name: 'Manage',
            type: 'saperator'
          };
          const profilemenu =    {
            state: 'forum/profile',
            name: 'Profile',
            type: 'extLink'
          };
          this.sidemenus.push(newmenu);
          this.sidemenus.push(profilemenu);
        }
      }

      if (this.user && this.user.role === 'admin') {
        const usermenu = this.sidemenus.find(m => m.name === 'Users');
        if (!usermenu) {
          const newmenu = {
            state: 'forum/users',
            name: 'Users',
            type: 'extLink'
          };
          this.sidemenus.push(newmenu);
        }
      }
    });

    if (this.user) {
      const separatemenu = this.sidemenus.find(m => m.name === 'Manage');
      if (!separatemenu) {
        const newmenu =    {
          state: '',
          name: 'Manage',
          type: 'saperator'
        };
        const profilemenu =    {
          state: 'forum/profile',
          name: 'Profile',
          type: 'extLink'
        };
        this.sidemenus.push(newmenu);
        this.sidemenus.push(profilemenu);
      }
    }

    if (this.user && this.user.role === 'admin') {
      const usermenu = this.sidemenus.find(m => m.name === 'Users');
      if (!usermenu) {
        const newmenu =    {
          state: 'forum/users',
          name: 'Users',
          type: 'extLink'
        };
        this.sidemenus.push(newmenu);
      }

    }

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
