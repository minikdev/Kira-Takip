import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirerDetailPageRoutingModule } from './hirer-detail-routing.module'

import { HirerDetailPage } from './hirer-detail.page'
import { NewRentComponent } from './rents/new-rent/new-rent.component'
import { RentTableComponent } from './rents/rents-table/rent-table.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirerDetailPageRoutingModule,
  ],
  declarations: [HirerDetailPage, RentTableComponent, NewRentComponent],
  exports: [RentTableComponent],
})
export class HirerDetailPageModule {}
