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
// Settings
import { SettingsComponent } from './components/settings/settings.component';
// Profile
import { ProfileComponent } from './components/profile/profile.component';
// Help
import { HelpComponent } from './components/help/help.component';
// UI
import { LoaderComponent } from './ui/loader/loader.component';
import { RangeComponent } from './ui/range/range.component';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { TooltipDirective } from './ui/tooltip/tooltip.directive';
// Providers
import { ResponseService } from './services/providers/response/response.service';
import { ErrorService } from './services/providers/error/error.service';

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
        SettingsComponent,
        ProfileComponent,
        HelpComponent
    ],
    entryComponents: [
        TooltipComponent,
        SettingsComponent,
        ProfileComponent,
        HelpComponent
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
    exports: [
        SettingsComponent
    ],
    providers: [
        ResponseService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
