import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project/project.service';
import { ProjectComponent } from '../project/project.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl'],
    providers: [
        ProjectService
    ]
})
export class DashboardComponent implements OnInit {
    /****************************/
    /* Инициализация переменных */
    /****************************/
    projects: ProjectComponent[];
    projectsSubscription;

    constructor(
        private projectService: ProjectService, 
    ){}

    /*********************/
    /* Методы компонента */
    /*********************/
    getProjects(): void {
        this.projectsSubscription = this.projectService.list().subscribe(projects => {
            console.log(projects);
            this.projects = projects;
        });
    }

    create(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.projectService.create(name)
              .subscribe(project => {
                    this.projects.push(project);
              });
    }

    /****************************/
    /* Инициализация компонента */
    /****************************/
    ngOnInit() {
        this.getProjects();
    }
}
