import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { ProjectService } from '../../services/project/project.service';
// Components
import { ProjectComponent } from '../../components/project/project.component';

@Component({
    selector: 'workplace',
    templateUrl: './workplace.component.html',
    styleUrls: ['./workplace.component.styl'],
    providers: [
        ProjectService
    ]
})

export class WorkplaceComponent implements OnInit {
    loading: boolean;
    project: ProjectComponent = null;
    projects: ProjectComponent[];
    projectsSubscription;
    routeSubscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private projectService: ProjectService
    ) {}

    /**
     * Возвращает список проектов
     */
    getProjects(): void {
        this.projectsSubscription = this.projectService.list().subscribe(projects => {
            this.projects = projects;
        });
    }

    selectProject(event) {
        this.project = event.project;
    }

    /****************************/
    /* Инициализация компонента */
    /****************************/
    ngOnInit(): void {
        this.getProjects();

        this.routeSubscription = this.route.params
              .switchMap((params: Params) => {
                  if (params['id']) {
                      return this.projectService.item(+params['id'])
                  } else {
                      return Observable.of<ProjectComponent>();
                  }
              })
              .subscribe(project => this.project = project);
    }
}
