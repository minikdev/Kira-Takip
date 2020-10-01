import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'houses',
    loadChildren: () =>
      import('./houses/houses.module').then((m) => m.HousesPageModule),
  },
  {
    path: '',
    redirectTo: 'houses',
    pathMatch: 'full',
  },
  {
    path: 'hirers',
    loadChildren: () =>
      import('./hirers/hirers.module').then((m) => m.HirersPageModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
