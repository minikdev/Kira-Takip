import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HirerProfilePageRoutingModule } from './hirer-profile-routing.module';

import { HirerProfilePage } from './hirer-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirerProfilePageRoutingModule
  ],
  declarations: [HirerProfilePage]
})
export class HirerProfilePageModule {}
