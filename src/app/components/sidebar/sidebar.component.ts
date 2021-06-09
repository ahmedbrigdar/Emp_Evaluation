import { Component, OnInit } from '@angular/core';

declare class RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  forAdmin: boolean;
  forUser: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '', forAdmin: true, forUser: true },
  { path: '/addUser', title: 'Add Employee', icon: 'users_single-02', class: '', forAdmin: true, forUser: false },
  { path: '/users', title: 'Employees List', icon: 'design_bullet-list-67', class: '', forAdmin: true, forUser: false },

  // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

  // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    const forAdmin: any = localStorage.getItem('isAdmin');
    console.log(forAdmin);
    if (forAdmin ==='true') {
      this.menuItems = ROUTES.filter((routeInfo: RouteInfo) =>
        routeInfo.forAdmin === true);
    } else {
      this.menuItems = ROUTES.filter((routeInfo: RouteInfo) =>
      routeInfo.forUser === true);
    }

    console.log(this.menuItems);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
