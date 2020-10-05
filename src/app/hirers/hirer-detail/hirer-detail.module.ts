import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirerDetailPageRoutingModule } from './hirer-detail-routing.module'

import { HirerDetailPage } from './hirer-detail.page'
import { NewRentComponent } from './rents/new-rent/new-rent.component'
import { RentTableComponent } from './rents/rents-table/rent-table.component'
import { PhonePipe } from 'src/app/shared/phone.pipe'

@NgModule({
  imports: [
    CommonModule,

    IonicModule,
    HirerDetailPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HirerDetailPage,
    RentTableComponent,
    NewRentComponent,
    PhonePipe,
  ],
  exports: [
    RentTableComponent,
    NewRentComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HirerDetailPageModule {}
