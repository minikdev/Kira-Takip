import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HirerEditPageRoutingModule } from './hirer-edit-routing.module'

import { HirerEditPage } from './hirer-edit.page'
import { HirerDetailPageModule } from '../hirer-detail/hirer-detail.module'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HirerEditPageRoutingModule,
    HirerDetailPageModule,
  ],
  declarations: [HirerEditPage],
})
export class HirerEditPageModule {}
