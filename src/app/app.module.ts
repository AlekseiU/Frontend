import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatabaseService }  from './services/database/database.service';

import { AppComponent } from './app.component';
// Template
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Workplace
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Project
import { ProjectComponent } from './components/project/project.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
// Data
import { DataComponent } from './components/data/data.component';
import { DataDetailComponent } from './components/data/data-detail/data-detail.component';
// UI
import { LoaderComponent } from './components/loader/loader.component';
import { DialogDirective } from './directives/dialog.directive';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    HeaderComponent,
    FooterComponent,
    ProjectListComponent,
    LoaderComponent,
    WorkplaceComponent,
    ProjectComponent,
    DialogDirective,
    DashboardComponent,
    ProjectDetailComponent,
    DataDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(DatabaseService),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
