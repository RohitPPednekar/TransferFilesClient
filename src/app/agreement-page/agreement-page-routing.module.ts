import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementPagePage } from './agreement-page.page';

const routes: Routes = [
  {
    path: '',
    component: AgreementPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementPagePageRoutingModule {}
