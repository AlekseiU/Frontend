import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
// Services
import { ProjectService } from '../../../services/project/project.service';
// Components
import { ProjectComponent } from '../../../components/project/project.component';

@Component({
    selector: 'project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.styl'],
    providers: [
        ProjectService
    ]
})

export class ProjectListComponent implements OnInit {
    @Input()
    projects: ProjectComponent[];
    @Input()
    default: ProjectComponent;

    @Output()
    selected = new EventEmitter<any>();

    loading: boolean;
    visibility: boolean;
    current: ProjectComponent;
    defaultSubscription;

    constructor (
        private router: Router,
        private projectService: ProjectService,
    ) {}

    /**
     * Возвращает настройки компонента
     */
    getSetting(): void {
          this.visibility = true;
    }

    /**
     * Создает новый проект
     * @param name имя нового проекта
     */
    create(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.projectService.create(name)
              .subscribe(project => {
                    this.projects.push(project);
              });
    }

    /**
     * Удаляет проект
     * @param index идентификатор в массиве
     * @param project модель проекта
     */
    delete(index: number, project: ProjectComponent): void {
        this.projectService
            .delete(project.id)
            .subscribe((response) => {
                this.projects.splice(index, 1);
            });
    }

    /**
     * Устанавливает активный проект
     * @param project модель проекта
     */
    select(project: ProjectComponent) {
        this.current = project;
        this.selected.emit({
            project: project
        });
        this.router.navigate(['/workplace', project.id]);
    }

    /**
     * Сворачивает компонент
     */
    hide() {
        this.visibility = !this.visibility;
    }

    ngOnChanges() {
        if (this.default) {
            this.select(this.default);
        }
    }

    ngOnInit(): void {
        this.getSetting();
    }
}
