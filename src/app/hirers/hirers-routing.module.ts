import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HirersPage } from './hirers.page'

const routes: Routes = [
  {
    path: '',
    component: HirersPage,
  },
  {
    path: ':hirerId',
    loadChildren: () =>
      import('./hirer-profile/hirer-profile.module').then(
        (m) => m.HirerProfilePageModule
      ),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirersPageRoutingModule {}
