import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
export class AppRoutingModule {}
