import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HirersPageRoutingModule } from './hirers-routing.module';

import { HirersPage } from './hirers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirersPageRoutingModule
  ],
  declarations: [HirersPage]
})
export class HirersPageModule {}
