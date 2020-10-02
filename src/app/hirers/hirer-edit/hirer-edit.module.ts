import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirerEditPageRoutingModule } from './hirer-edit-routing.module'

import { HirerEditPage } from './hirer-edit.page'
import { HirerDetailPageModule } from '../hirer-detail/hirer-detail.module'
import { RentTableComponent } from '../hirer-detail/rents/rents-table/rent-table.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirerEditPageRoutingModule,
    ReactiveFormsModule,
    HirerDetailPageModule,
  ],
  declarations: [HirerEditPage],
})
export class HirerEditPageModule {}
