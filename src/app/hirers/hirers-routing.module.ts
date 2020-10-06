import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HirersPage } from './hirers.page'
import { NewHirerComponent } from './new-hirer/new-hirer.component'

const routes: Routes = [
  {
    path: '',
    component: HirersPage,
    children: [
      {
        path: 'new',
        component: NewHirerComponent,
      },
      {
        path: ':hirerId',
        loadChildren: () =>
          import('./hirer-detail/hirer-detail.module').then(
            (m) => m.HirerDetailPageModule
          ),
      },
      {
        path: ':hirerId/edit',
        loadChildren: () =>
          import('./hirer-edit/hirer-edit.module').then(
            (m) => m.HirerEditPageModule
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirersPageRoutingModule {}
