import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';

import { ProjectService } from '../../../services/project/project.service';
import { ProjectComponent } from '../../project/project.component';

import { DataService } from '../../../services/data/data.service';
import { DataComponent } from '../../data/data.component';

@Component({
    selector: 'project-detail',
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

            if (this.draggable.coordinates.x) {
                this.draggable.coordinates.x += this.x(e);
            } else {
                this.draggable.coordinates.x = this.x(e);
            }

            if (this.draggable.coordinates.y) {
                this.draggable.coordinates.y += this.y(e);
            } else {
                this.draggable.coordinates.y = this.y(e);
            }
        } else if (this.dragCanvas) {
            for (let item in this.data) {
                if (item) {
                    this.data[item].coordinates.x += this.x(e);
                    this.data[item].coordinates.y += this.y(e);
                }
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
    x(e: MouseEvent): number {
        return e.movementX / this.scaleOrigin;
    }

    y(e: MouseEvent): number {
        return e.movementY / this.scaleOrigin;
    }

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
        if (!this.lockScale) {
            this.draggable = data;
        }
    }

    startDragCanvas(): void {
        if (!this.lockScale) {
          this.dragCanvas = true;
        }
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

    autosave() {
        this.projectService.update(this.project)
            .subscribe(() => {
                // console.log(this.project);
            });
    }

    deleteData(data: DataComponent, index: number) {
        this.dataService.delete(data.id)
            .subscribe((response) => {
                this.data.splice(index, 1);
            });
    }

    /****************************/
    /* Инициализация компонента */
    /****************************/
    ngOnChanges() {
        if (this.project) {
            this.dataService.list(this.project.id).subscribe(data => {
                this.data = data;
            });
        }
    }

    ngOnInit() {
        // Автосохранение проекта
        setInterval(() => {
            this.autosave();
        }, 5000);
    }
}

/********* ToDo: **********/
/* Автосохранение проекта */
/**************************/