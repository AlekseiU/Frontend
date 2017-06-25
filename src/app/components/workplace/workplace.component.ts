import { Resolve } from 'resolve';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ProjectService } from '../../services/project/project.service';
import { ProjectComponent } from '../project/project.component';
import { DataService } from '../../services/data/data.service';
import { DataComponent } from '../data/data.component';

@Component({
	selector: 'workplace',
	templateUrl: './workplace.component.html',
	styleUrls: ['./workplace.component.styl'],
	providers: [
		ProjectService,
		ProjectComponent
	]
})

export class WorkplaceComponent implements OnInit {
	/****************************/
	/* Инициализация переменных */
	/****************************/
	loading: boolean;
	project: ProjectComponent = null;
	projects: ProjectComponent[];
	projectsSubscription;
	routeSubscription;

	constructor(
		private router: Router,
	    private route: ActivatedRoute,
	    private location: Location,
	    private projectService: ProjectService,
	    private projectComponent: ProjectComponent
	){}

	/*********************/
	/* Методы компонента */
	/*********************/
	getProjects(): void {
		this.projectsSubscription = this.projectService.getProjects().subscribe(projects => {
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
			  		return this.projectService.getProject(+params['id'])
			  	} else {
			  		return Observable.of<ProjectComponent>()
			  	}
		  	})
	  		.subscribe(project => this.project = project);
	}
}
