import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// Guards
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'workplace/:id',
        canActivate: [AuthGuard],
        component: WorkplaceComponent,
    },
    {
        path: '**',
        component: NotFoundComponent 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
