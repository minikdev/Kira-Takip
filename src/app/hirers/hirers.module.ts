import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirersPageRoutingModule } from './hirers-routing.module'
import { HirersPage } from './hirers.page'
import { TabsComponent } from '../shared/tabs/tabs.component'
import { HirersTableComponent } from './hirers-table/hirers-table.component'
import { NewHirerComponent } from './new-hirer/new-hirer.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HirersPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HirersPage,
    TabsComponent,
    HirersTableComponent,
    NewHirerComponent,
  ],
})
export class HirersPageModule {}
