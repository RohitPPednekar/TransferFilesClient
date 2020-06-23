import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
  ],
  providers: [
    File,
    FileTransfer,
    AndroidPermissions
  ],
})
export class SideMenuModule { }
