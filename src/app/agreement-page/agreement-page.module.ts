import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementPagePageRoutingModule } from './agreement-page-routing.module';

import { AgreementPagePage } from './agreement-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementPagePageRoutingModule
  ],
  declarations: [AgreementPagePage]
})
export class AgreementPagePageModule {}
