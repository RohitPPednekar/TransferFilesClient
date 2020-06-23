import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilesExplorerPage } from './files-explorer.page';

const routes: Routes = [
  {
    path: '',
    component: FilesExplorerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesExplorerPageRoutingModule {}
