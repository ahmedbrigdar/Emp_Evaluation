import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddUserComponent } from '../../pages/add-user/add-user.component';
import { LoginComponent } from '../../pages/login/login.component';
import { UsersListComponent } from '../../pages/users-list/users-list.component';
import { EvaluateComponent } from '../../pages/evaluate/evaluate.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'users', component: UsersListComponent },
    { path: 'evaluate', component: EvaluateComponent },
];
