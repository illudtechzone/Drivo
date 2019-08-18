import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/security';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',
  canActivate: [AuthGuardService] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'doc-upload', loadChildren: './pages/doc-upload/doc-upload.module#DocUploadPageModule'
,canActivate: [AuthGuardService] },
  { path: 'riderdetails', loadChildren: './pages/rider-details/rider-details.module#RiderDetailsPageModule',
  canActivate: [AuthGuardService] },
  { path: 'startride', loadChildren: './pages/start-ride/start-ride.module#StartRidePageModule'
  ,canActivate: [AuthGuardService]
 },
  { path: 'invoice', loadChildren: './pages/invoice/invoice.module#InvoicePageModule',
  canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
