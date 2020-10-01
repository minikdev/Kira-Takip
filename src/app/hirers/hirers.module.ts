import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirersPageRoutingModule } from './hirers-routing.module'

import { HirersPage } from './hirers.page'
import { HeaderComponent } from '../header/header.component'
import { HirersTableComponent } from './hirers-table/hirers-table.component'
import { RentTableComponent } from './hirer-detail/rents/rents-table/rent-table.component'

import { HirerDetailComponent } from './hirer-detail/hirer-detail.component'
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HirersPageRoutingModule],
  declarations: [
    HirersPage,
    HeaderComponent,
    HirersTableComponent,
    RentTableComponent,

    HirerDetailComponent,
  ],
})
export class HirersPageModule {}
