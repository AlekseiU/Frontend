import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkplaceComponent } from './components/workplace/workplace.component';
// import { ProjectsComponent }      from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'workplace/:id',
        component: WorkplaceComponent,
        // resolve: [ResolveGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
