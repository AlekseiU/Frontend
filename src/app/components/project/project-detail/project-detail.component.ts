import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project/project.service';
import { DataService } from '../../../services/data/data.service';
// Components
import { ProjectComponent } from '../../../components/project/project.component';
import { DataComponent } from '../../../components/data/data.component';

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
    @Input() project: ProjectComponent;

    draggable: DataComponent;
    dragInProcess: boolean;
    data: DataComponent[];
    dragCanvas: boolean;
    defaultX: number;
    defaultY: number;
    lockScale: boolean;
    scaleOrigin = 1;
    scaleStyle: string = 'scale(' + this.scaleOrigin + ')';

    @HostListener('mouseup', ['$event']) mouseUp(e) {
        if (this.draggable) {
            if (!this.dragInProcess) {
                this.lockScale = true;
            } else {
                this.updateData(this.draggable);
            }
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
    ) {}

    /**
     * Двигает компонент по оси X
     * @param e событие мыши
     */
    x(e: MouseEvent): number {
        return e.movementX / this.scaleOrigin;
    }

    /**
     * Двигает компонент по оси Y
     * @param e событие мыши
     */
    y(e: MouseEvent): number {
        return e.movementY / this.scaleOrigin;
    }

    /**
     * Масштабирует проект
     * @param e событие мыши
     */
    wheel(e) {
        if (!this.lockScale) {
            e.preventDefault();
            const delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta > 0) {
                this.scaleOrigin -= 0.01;
            } else {
                this.scaleOrigin += 0.01;
            }

            this.scaleStyle = 'scale(' + this.scaleOrigin + ')';
        }
    }

    /**
     * Перемещает Data компонент по полотну
     * @param data модель Data
     */
    dragData(data: DataComponent): void {
        if (!this.lockScale) {
            this.draggable = data;
        }
    }

    /**
     * Сдвигает все элементы на полотне
     */
    startDragCanvas(): void {
        if (!this.lockScale) {
          this.dragCanvas = true;
        }
    }

    /**
     * Связывает Data объекты между собой
     * @param data модель Data
     */
    linkData(data: DataComponent) {
        if (this.draggable && this.draggable !== data) {
            this.draggable.parent = data.id;
        }
    }

    /**
     * Создает Data объект
     */
    createData(): void {
        const data: DataComponent = {
            id: null,
            name: 'Без имени',
            project: this.project.id,
            parent: null,
            coordinates: {
                x: (document.getElementsByClassName('dataList')[0].scrollWidth / 2) - 50,
                y: (document.getElementsByClassName('dataList')[0].scrollHeight / 2) - 50
            },
            content: null,
            fullScreen: false
        };

        this.dataService.create(data)
            .subscribe(response => {
                this.data.push(response);
            });
    }

    /**
     * Обновляет Data компонент
     * @param data модель Data
     */
    updateData(data: DataComponent): void {
        this.dataService.update(data)
            .subscribe(response => {
                data = response;
            });
    }

    /**
     * Ищет родителя Data объекта
     * @param id идентификатор Data
     */
    findParent(id: any) {
        if (this.data && id) {
            return this.data.find((element) => {
                return element.id === parseInt(id);
            });
        }
    }

    /**
     * Масштабирует проект
     * @param scale масштаб
     */
    handleScale(scale: number) {
        this.scaleOrigin = scale;
        this.scaleStyle = 'scale(' + this.scaleOrigin + ')';
    }

    /**
     * Автосохранение проекта
     */
    autosave() {
        this.projectService.update(this.project)
            .subscribe(() => {
                // console.log(this.project);
            });
    }

    ngOnChanges() {
        if (this.project) {
            this.dataService.list(this.project.id).subscribe(data => {
                this.data = data;
            });
        }
    }

    ngOnInit() {
        setInterval(() => {
            // this.autosave();
        }, 5000);
    }
}
