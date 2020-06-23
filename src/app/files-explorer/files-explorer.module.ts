import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilesExplorerPageRoutingModule } from './files-explorer-routing.module';

import { FilesExplorerPage } from './files-explorer.page';
import { DirectoryListsService } from '../directory-lists-service/directory-lists.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilesExplorerPageRoutingModule
  ],
  declarations: [FilesExplorerPage],
  providers:[
    DirectoryListsService,
    File,
    FileTransfer,
    AndroidPermissions
  ]
})
export class FilesExplorerPageModule {}
