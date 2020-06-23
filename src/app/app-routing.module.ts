import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/home',
    pathMatch: 'full'
  },
  // {
  //   path: 'auth',
  //   component: SideMenuComponent,
  //   //canActivate: [AuthGuard],
  //   //canActivateChild: [AuthGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  //     },
  //     {
  //       path: 'list',
  //       loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  //     },
  //   ]
  // },
  {
    path: 'auth',
    loadChildren: () => import('./side-menu/side-menu.module').then( m => m.SideMenuModule),
//    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'files-explorer',
    loadChildren: () => import('./files-explorer/files-explorer.module').then( m => m.FilesExplorerPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
