import { Component, OnInit } from '@angular/core';
// Services
import { ProjectService } from '../../services/project/project.service';
// Components
import { ProjectComponent } from '../../components/project/project.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl'],
    providers: [
        ProjectService
    ]
})
export class DashboardComponent implements OnInit {
    projects: ProjectComponent[];
    projectsSubscription;

    constructor(
        private projectService: ProjectService,
    ) {}

    /**
     * Получает список проектов
     */
    getProjects(): void {
        this.projectsSubscription = this.projectService.list().subscribe(projects => {
            this.projects = projects;
        });
    }

    /**
     * Создает проект
     * @param name имя проекта
     */
    create(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.projectService.create(name)
              .subscribe(project => {
                    this.projects.push(project);
              });
    }

    ngOnInit() {
        this.getProjects();
    }
}
