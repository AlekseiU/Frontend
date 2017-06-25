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
		this.projectsSubscription = this.projectService.getProjects().subscribe(projects => {
			this.projects = projects;
		});
	}  

	/****************************/
	/* Инициализация компонента */
	/****************************/
	ngOnInit() {
		this.getProjects();
	}
}
