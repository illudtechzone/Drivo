import { SecurityService } from './services/security.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [SecurityService]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'doc-upload', loadChildren: './pages/doc-upload/doc-upload.module#DocUploadPageModule' },
  { path: 'riderdetails', loadChildren: './pages/rider-details/rider-details.module#RiderDetailsPageModule' },
  { path: 'startride', loadChildren: './pages/start-ride/start-ride.module#StartRidePageModule'
  ,canActivate: [SecurityService]
 },
  { path: 'invoice', loadChildren: './pages/invoice/invoice.module#InvoicePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
