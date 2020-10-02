import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HirerEditPage } from './hirer-edit.page';

const routes: Routes = [
  {
    path: '',
    component: HirerEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirerEditPageRoutingModule {}
