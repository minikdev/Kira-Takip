import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HouseDetailComponent } from './house-detail/house-detail.component'
import { HouseEditComponent } from './house-edit/house-edit.component'

import { HousesPage } from './houses.page'

const routes: Routes = [
  {
    path: '',
    component: HousesPage,
    children: [
      {
        path: 'new',
        component: HouseEditComponent,
      },
      {
        path: ':houseId',
        component: HouseDetailComponent,
      },
      {
        path: ':houseId/edit',
        component: HouseEditComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousesPageRoutingModule {}
