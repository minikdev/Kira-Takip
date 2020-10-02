import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NewRentComponent } from './rents/new-rent/new-rent.component'
import { HirerDetailPage } from './hirer-detail.page'

const routes: Routes = [
  {
    path: '',
    component: HirerDetailPage,
    children: [
      {
        path: 'new',
        component: NewRentComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirerDetailPageRoutingModule {}
