import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HirerProfilePage } from './hirer-profile.page';

const routes: Routes = [
  {
    path: '',
    component: HirerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HirerProfilePageRoutingModule {}
