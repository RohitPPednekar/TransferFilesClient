import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
          {
            path: '',
            component: SideMenuComponent,
            children:[
              {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
              },
              {
                path: 'list',
                loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
              },
            ]
          },
    ])
  ]
})
export class SideMenuModule { }
