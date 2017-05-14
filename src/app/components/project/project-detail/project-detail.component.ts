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
	dragging: boolean = false;
	data: DataComponent[] = [];
	scaleOrigin: number = 1;
	scaleStyle: string = this.scaleStyle = 'scale(' + this.scaleOrigin + ')';
	dragCanvas: boolean = false;
	defaultX: number;
	defaultY: number;
	lockScale: boolean = false;

	/***********************/
	/* Обработчики событий */
	/***********************/
	@HostListener('mousedown', ['$event']) mouseDown(e) {
  		if (!this.draggable) {
	  		this.dragCanvas = true;
		}
  	}
  	@HostListener('mouseup', ['$event']) mouseUp(e) {
  		if (this.draggable) {
	  		if (!this.dragging) {
	  			this.draggable.fullScreen = true;
	  		}
	  		this.updateData(this.draggable);
			this.draggable = null;
			this.dragging = false;
		}
		this.dragCanvas = false;
  	}
	@HostListener('mousemove', ['$event']) mouseMove(e) {
		if (this.draggable && !this.lockScale) {
			this.dragging = true;
			this.draggable.coordinates.x = this.draggable.coordinates.x ? this.draggable.coordinates.x += e.movementX : 0 + e.movementX;
            this.draggable.coordinates.y = this.draggable.coordinates.y ? this.draggable.coordinates.y += e.movementY : 0 + e.movementY;
        } else if (this.dragCanvas) {
			for (let item in this.data) {
				this.data[item].coordinates.x += e.movementX;
				this.data[item].coordinates.y += e.movementY;
			}
		}
  	}	
  	@HostListener('click', ['$event']) mouseClick(e) {
  		this.lockScale = !this.data.every((item) => {
			return !item.fullScreen;
		});
  	}

	constructor(
		private projectService: ProjectService,
		private dataService: DataService
	){}

	/*********************/
	/* Методы компонента */
	/*********************/
	wheel(e) {
		this.lockScale = !this.data.every((item) => {
			return !item.fullScreen;
		});
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

	drag(data: DataComponent): void {
		this.draggable = data;
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

	ngOnInit() {
		
	}
}

/********* ToDo: **********/
/* Автосохранение проекта */
/**************************/