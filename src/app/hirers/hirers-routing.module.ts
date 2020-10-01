import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HirerDetailComponent } from './hirer-detail/hirer-detail.component'
import { HirersPage } from './hirers.page'

const routes: Routes = [
  {
    path: '',
    component: HirersPage,
  },
  {
    path: ':hirerId',
    component: HirerDetailComponent,
    children: [
      {
        path: '',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirersPageRoutingModule {}
