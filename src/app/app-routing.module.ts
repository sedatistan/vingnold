import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from './auth/auth-route-guard';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'home-page-admin',
    loadChildren: () => import('./pages/home-page-admin/home-page-admin.module').then(m => m.HomePageAdminModule), canActivate: [AppRouteGuard] 
  },
  {
    path: 'blog-detail/:blogId',
    loadChildren: () => import('./pages/blog-detail/blog-detail.module').then(m => m.BlogDetailModule) 
  },
  {
    path: 'blog-detail-admin',
    loadChildren: () => import('./pages/blog-detail-admin/blog-detail-admin.module').then(m => m.BlogDetailAdminModule),canActivate: [AppRouteGuard]
  },
  {
    path: 'blog-detail-admin/:blogId',
    loadChildren: () => import('./pages/blog-detail-admin/blog-detail-admin.module').then(m => m.BlogDetailAdminModule),canActivate: [AppRouteGuard]
  },
  { path: '**', redirectTo: 'error/404' },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
