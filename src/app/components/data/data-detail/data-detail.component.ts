import { Component, OnInit, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';
// Services
import { DataService } from '../../../services/data/data.service';
import { GroupService } from '../../../services/data/group/group.service';
// Components
import { DataComponent } from '../../../components/data/data.component';

@Component({
    selector: 'data-detail',
    templateUrl: './data-detail.component.html',
    styleUrls: ['./data-detail.component.styl'],
    providers: [
        DataService,
        GroupService
    ]
})
export class DataDetailComponent implements OnInit {
    @Input() dataItem: DataComponent;
    @Input() dataList: DataComponent[];
    @Input() dragInProcess: boolean;

    @Output() toogleFullscreen = new EventEmitter();

    showCreateList: boolean;
    showParentList: boolean;
    parent: DataComponent = null;
    tempData = {
        coordinates: null
    };

    constructor(
        private dataService: DataService,
        private groupService: GroupService
    ) {}

    /**
     * Отслеживает переключение полноэкранного режима
     * @param event событие переключения
     */
    watchOpen(event) {
        this.tempData.coordinates = {
            x: this.dataItem.coordinates.x,
            y: this.dataItem.coordinates.y
        }
        this.toogleFullscreen.emit(this.dataItem.fullScreen);
    }

    /**
     * Отслеживает переключение полноэкранного режима
     * @param event событие переключения
     */
    resolveOpen(event) {
        if (this.tempData.coordinates.x === this.dataItem.coordinates.x && 
            this.tempData.coordinates.y === this.dataItem.coordinates.y) {
            this.dataItem.fullScreen = true;
            this.toogleFullscreen.emit(this.dataItem.fullScreen);
        }
    }

    /**
     * Обновляет компонент
     * @param data модель Data
     */
    update(data: DataComponent): void {
        this.dataService.update(data)
              .subscribe(response => {
                    // this.dataItem = response;
              });
    }

    /**
     * Удаляет компонент
     * @param data модель Data
     */
    delete(data: DataComponent) {
        const index = this.dataList.indexOf(data);

        this.dataService.delete(data.id)
            .subscribe((response) => {
                this.dataList.splice(index, 1);
            });
    }

    /**
     * Сохранение объекта
     */
    approve() {
        this.dataItem.fullScreen = false;
        this.update(this.dataItem);
        this.toogleFullscreen.emit(this.dataItem.fullScreen);
    }

    /**
     * Отмена изменений объекта
     */
    declane() {
        this.dataItem.fullScreen = false;
        this.toogleFullscreen.emit(this.dataItem.fullScreen);
    }

    /**
     * Удаляет привязку к родителю
     */
    deleteParent() {
        this.dataItem.parent = null;
        this.update(this.dataItem);
        this.toogleFullscreen.emit(this.dataItem.fullScreen);
    }

    /**
     * Создает дочерний Data объект
     */
    createChild() {
        const data: DataComponent = {
            id: null,
            name: 'Без имени',
            project: this.dataItem.project,
            parent: this.dataItem.id,
            coordinates: {
                x: this.dataItem.coordinates.x,
                y: this.dataItem.coordinates.y + 130
            },
            content: null,
            fullScreen: false
        };

        this.dataService.create(data)
            .subscribe((response: DataComponent) => {
                this.dataList.push(response);
            });

        this.toogleFullscreen.emit(this.dataItem.fullScreen);
    }

    /**
     * Добавление группы полей
     * @param data модель Data
     */
    addGroup(data: DataComponent) {
        const group = {
            id: null,
            name: '',
            order: 0,
            data: data.id,
            collapsed: false,
            fields: []
        };

        this.groupService.create(group)
            .subscribe((response) => {
                this.dataItem.content.push(response);
            });
    }

    // ngOnChanges() {
    //     this.parent = this.dataList.find((value: DataComponent) => {
    //         return value.id === this.dataItem.parent;
    //     });
    //     this.parent = this.parent ? this.parent : null;
    // }

    ngOnInit() {
        if (!this.dataItem.coordinates.x) {
            this.dataItem.coordinates.x = (document.getElementsByClassName('dataList')[0].scrollWidth / 2) - 50;
        }

        if (!this.dataItem.coordinates.y) {
            this.dataItem.coordinates.y = (document.getElementsByClassName('dataList')[0].scrollHeight / 2) - 50;
        }
    }
}
