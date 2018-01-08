// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Angular material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Order plugin
import { Ng2OrderModule } from 'ng2-order-pipe';
// Application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Template
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Workplace
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Project
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
// Data
import { DataDetailComponent } from './components/data/data-detail/data-detail.component';
import { DataFieldComponent } from './components/data/data-field/data-field.component';
import { DataGroupComponent } from './components/data/data-group/data-group.component';
// Dialogs
import { ProfileDialogComponent } from './dialogs/profile/profile.component';
import { RegistrationDialogComponent } from './dialogs/registration/registration.component';
import { LoginDialogComponent } from './dialogs/login/login.component';
// Pages
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// UI
import { LoaderComponent } from './ui/loader/loader.component';
import { RangeComponent } from './ui/range/range.component';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { TooltipDirective } from './ui/tooltip/tooltip.directive';
import { LogoComponent } from './ui/logo/logo.component';
// Providers
import { ResponseService } from './providers/response/response.service';
import { ErrorService } from './providers/error/error.service';
import { UserService } from './providers/user/user.service';
// Scrapper
import { ScrapperService } from './services/scrapper/scrapper.service';
// Guards
import { AuthGuard } from './guards/auth/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ProjectListComponent,
        LoaderComponent,
        WorkplaceComponent,
        DashboardComponent,
        ProjectDetailComponent,
        DataDetailComponent,
        DataFieldComponent,
        RangeComponent,
        TooltipComponent,
        TooltipDirective,
        LogoComponent,
        DataGroupComponent,
        ProfileDialogComponent,
        RegistrationDialogComponent,
        LoginDialogComponent,
        IndexComponent,
        NotFoundComponent,
    ],
    entryComponents: [
        TooltipComponent,
        ProfileDialogComponent,
        RegistrationDialogComponent,
        LoginDialogComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        Ng2OrderModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    providers: [
        ResponseService,
        ErrorService,
        ScrapperService,
        UserService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
