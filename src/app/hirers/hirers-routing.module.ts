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
  // {
  //   path: ':hirerId',
  //   component: HirerDetailComponent,
  //   children: [
  //     {
  //       path: 'edit',
  //       component: HirerEditComponent,
  //     },
  //     {
  //       path: 'new',
  //       component: NewRentComponent,
  //     },
  //   ],
  // },
  // {
  //   path: ':hirerId',
  //   loadChildren: () =>
  //     import('../demopage/demopage.module').then(
  //       (m) => m.DemopagePageModule
  //     ),
  // },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirersPageRoutingModule {}
