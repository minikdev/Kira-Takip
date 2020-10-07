import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { TabsComponent } from './shared/tabs/tabs.component'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'houses',
        loadChildren: () =>
          import('./houses/houses.module').then((m) => m.HousesPageModule),
      },
      {
        path: '',
        redirectTo: 'hirers',
        pathMatch: 'full',
      },
      {
        path: 'hirers',
        loadChildren: () =>
          import('./hirers/hirers.module').then((m) => m.HirersPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
