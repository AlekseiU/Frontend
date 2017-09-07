import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
// Services
import { SettingsService } from '../../../services/settings/settings.service';
import { ProjectService } from '../../../services/project/project.service';
// Components
import { ProjectComponent } from '../../../components/project/project.component';

@Component({
    selector: 'project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.styl'],
    providers: [
        SettingsService,
        ProjectService
    ]
})

export class ProjectListComponent implements OnInit {
    /********************/
    /* Входные значения */
    /********************/
    @Input()
    projects: ProjectComponent[];
    @Input()
    default: ProjectComponent;

    /*********************/
    /* Выходные значения */
    /*********************/
    @Output() 
    selected = new EventEmitter<any>();

    /****************************/
    /* Инициализация переменных */
    /****************************/
    loading: boolean = false;
    visibility: boolean;
    selectedProject = {};
    defaultSubscription;

    constructor (
        private router: Router,
        private projectService: ProjectService,
        private settingsService: SettingsService
    ) {}

    /*********************/
    /* Методы компонента */
    /*********************/
    getSetting(): void {
          this.visibility = true;
    }

    create(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.projectService.create(name)
              .subscribe(project => {
                    this.projects.push(project);
              });
    }

    delete(index: number, project: ProjectComponent): void {
        this.projectService
            .delete(project.id)
            .subscribe((response) => {
                this.projects.splice(index, 1);
            });
    }

    select(project: ProjectComponent) {
        this.selectedProject = project;
        this.selected.emit({
            project: project
        });
        this.router.navigate(['/workplace', project.id]);
    }

    hide() {
        this.visibility = !this.visibility;
    }

    /****************************/
    /* Инициализация компонента */
    /****************************/
    ngOnChanges() {
        if (this.default) {
            this.select(this.default);
        }
    }

    ngOnInit(): void {
        this.getSetting();
    }
}
