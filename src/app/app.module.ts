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
import { DataFieldComponent } from './components/data/data-field/data-field.component';
// UI
import { LoaderComponent } from './ui/loader/loader.component';
import { RangeComponent } from './ui/range/range.component';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { TooltipDirective } from './ui/tooltip/tooltip.directive';
import { DialogComponent } from './ui/dialog/dialog.component';
import { DialogDirective } from './ui/dialog/dialog.directive';

// Order plugin
import { Ng2OrderModule } from 'ng2-order-pipe';

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
    DashboardComponent,
    ProjectDetailComponent,
    DataDetailComponent,
    DataFieldComponent,
    RangeComponent,
    TooltipComponent,
    TooltipDirective,
    DialogComponent,
    DialogDirective
  ],
  entryComponents: [
    TooltipComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(DatabaseService),
    AppRoutingModule,
    Ng2OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
