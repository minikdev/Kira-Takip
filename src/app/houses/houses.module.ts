import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HousesPageRoutingModule } from './houses-routing.module'

import { HousesPage } from './houses.page'
import { TabsComponent } from '../shared/tabs/tabs.component'
import { HousesTableComponent } from './houses-table/houses-table.component'
import { HouseDetailComponent } from './house-detail/house-detail.component'
import { HouseEditComponent } from './house-edit/house-edit.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HousesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HousesPage,
    TabsComponent,
    HousesTableComponent,
    HouseDetailComponent,
    HouseEditComponent,
  ],
})
export class HousesPageModule {}
