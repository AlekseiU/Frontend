import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';

import { ProjectService } from '../../../services/project/project.service';
import { ProjectComponent } from '../../project/project.component';

import { DataService } from '../../../services/data/data.service';
import { DataComponent } from '../../data/data.component';

@Component({
	selector: 'ma-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.styl'],
	providers: [
		ProjectService,
		DataService
	]
})
export class ProjectDetailComponent implements OnInit {
	/********************/
	/* Входные значения */
	/********************/
	@Input()
	project: ProjectComponent;
	
	/****************************/
	/* Инициализация переменных */
	/****************************/
	draggable: DataComponent = null;
	dragInProcess: boolean = false;
	data: DataComponent[] = [];
	scaleOrigin: number = 1;
	scaleStyle: string = 'scale(' + this.scaleOrigin + ')';
	dragCanvas: boolean = false;
	defaultX: number;
	defaultY: number;
	lockScale: boolean = false;

	/***********************/
	/* Обработчики событий */
	/***********************/
	// @HostListener('mousedown', ['$event']) mouseDown(e) {
 //  		if (!this.draggable) {
	//   		this.dragCanvas = true;
	// 	}
 //  	}
  	@HostListener('mouseup', ['$event']) mouseUp(e) {
  		if (this.draggable) {
	  		if (!this.dragInProcess) {
	  			this.lockScale = true;
	  		}
	  		this.updateData(this.draggable);
			this.draggable = null;
			this.dragInProcess = false;
		}
		this.dragCanvas = false;
  	}
	@HostListener('mousemove', ['$event']) mouseMove(e) {
		if (this.draggable) {
			this.dragInProcess = true;
			this.draggable.coordinates.x = this.draggable.coordinates.x ? this.draggable.coordinates.x += e.movementX / this.scaleOrigin : 0 + e.movementX / this.scaleOrigin;
            this.draggable.coordinates.y = this.draggable.coordinates.y ? this.draggable.coordinates.y += e.movementY / this.scaleOrigin : 0 + e.movementY / this.scaleOrigin;
        } else if (this.dragCanvas) {
			for (let item in this.data) {
				this.data[item].coordinates.x += e.movementX / this.scaleOrigin;
				this.data[item].coordinates.y += e.movementY / this.scaleOrigin;
			}
		}
  	}

	constructor(
		private projectService: ProjectService,
		private dataService: DataService
	){}

	/*********************/
	/* Методы компонента */
	/*********************/
	handleToogleFullscreen(event: boolean) {
		this.lockScale = event;
	}

	wheel(e) {
		if (!this.lockScale) {
			e.preventDefault();
			let delta = e.deltaY || e.detail || e.wheelDelta;
	  		if (delta > 0) {
	  			this.scaleOrigin -= 0.01;
	  		}
	     	else {
	     		this.scaleOrigin += 0.01;
	     	}
	     	this.scaleStyle = 'scale(' + this.scaleOrigin + ')';		
		}
	}

	dragData(data: DataComponent): void {
		this.draggable = data;
	}

	startDragCanvas(): void {
  		this.dragCanvas = true;
	}

	linkData(data: DataComponent) {
		if (this.draggable && this.draggable !== data) {
			this.draggable.parent = data.id;
		}
	}

	createData(name: string): void {
	    name = name.trim();
	    if (!name) { return; }
	    this.dataService.create(name, this.project.id)
	      	.subscribe(data => {
	      		data.coordinates.x = (document.getElementsByClassName('dataList')[0].scrollWidth / 2) - 50;
				data.coordinates.y = (document.getElementsByClassName('dataList')[0].scrollHeight / 2) - 50;
 	       		this.data.push(data);
 	     	});
	}

	updateData(data: DataComponent): void {
	    this.dataService.update(data)
	      	.subscribe(data => {
 	       		// this.data.push(data);
 	       		// console.log(data);
 	     	});
	}

	findParent(id: any) {
		if (this.data && id) {
			return this.data.find((element) => {
				return element.id === parseInt(id);
			});
		}
	}

	handleChildCreated(data: DataComponent) {
		this.data.push(data);
	}

	handleScale(scale) {
		this.scaleOrigin = scale;
		this.scaleStyle = 'scale(' + this.scaleOrigin + ')';
	}

	/****************************/
	/* Инициализация компонента */
	/****************************/
	ngOnChanges() {
		if (this.project) {
			this.dataService.getByProject(this.project.id).subscribe(data => {
				this.data = data;
			});
		}
	}

	ngOnInit() {}
}

/********* ToDo: **********/
/* Автосохранение проекта */
/**************************/