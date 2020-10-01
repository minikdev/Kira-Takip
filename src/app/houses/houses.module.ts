import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HousesPageRoutingModule } from './houses-routing.module'

import { HousesPage } from './houses.page'
import { HeaderComponent } from '../header/header.component'
import { HousesTableComponent } from './houses-table/houses-table.component'
import { HouseDetailComponent } from './house-detail/house-detail.component'
import { HouseEditComponent } from './house-edit/house-edit.component'

import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HousesPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HousesPage,
    HeaderComponent,
    HousesTableComponent,
    HouseDetailComponent,
    HouseEditComponent,
  ],
})
export class HousesPageModule {}
