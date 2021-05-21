import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { ProductsComponent } from './products/products.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix'},
  { path:'login', component:LoginComponent, pathMatch: 'full' },
  { path:'member', component:MembersComponent, canActivate:[AuthGuardGuard] },
  { path:'product', component:ProductsComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
  { path:'report', component:ReportingComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
  { path:'users', component:UsersComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
