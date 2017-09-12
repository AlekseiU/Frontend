import { Component, OnInit, Input, HostListener } from '@angular/core';
// Services
import { GroupService } from '../../../services/data/group/group.service';
import { FieldService } from '../../../services/data/field/field.service';
// Components
import { DataComponent } from '../../../components/data/data.component';
// Interfaces
import { IGroup } from '../../../interfaces/data/group/group';

@Component({
    selector: 'data-group',
    templateUrl: './data-group.component.html',
    styleUrls: ['./data-group.component.styl'],
    providers: [
        GroupService,
        FieldService
    ]
})
export class DataGroupComponent {
    @Input() data: DataComponent;
    @Input() group: IGroup;

    draggableGroup = null;
    draggableField = null;

    constructor(
        private groupService: GroupService,
        private fieldService: FieldService
    ) {}

    @HostListener('mouseup', ['$event']) mouseUp(e) {
        if (this.draggableGroup) {
            e.preventDefault();
            this.draggableGroup = null;
        }
        if (this.draggableField) {
            e.preventDefault();
            this.draggableField = null;
        }
    }

    /**
     * Добавление поля
     * @param group модель группы полей
     * @param type тип поля
     */
    addField(group, type: string) {
        const index = this.data.content.indexOf(group);
        const field = {
            id: null,
            type: type,
            value: '',
            order: 0,
            group: group.id
        };

        this.fieldService.create(field)
            .subscribe((response) => {
                this.data.content[index].fields.push(response);
                // this.showCreateList = false;
            });
    }

    /**
     * Удаляет группу полей
     * @param group модель группы
     */
    delete(group: IGroup) {
        this.groupService.delete(group.id)
            .subscribe((response) => {
                const index = this.data.content.indexOf(group);
                this.data.content.splice(index, 1);
            });
    }

    /**
     * Передвигает группу вверх
     * @param event событие мыши
     * @param group модель группы
     */
    orderUp(event: MouseEvent, group: IGroup) {
        event.preventDefault();
        group.order--;
    }

    /**
     * Передвигает группу вниз
     * @param event событие мыши
     * @param group модель группы
     */
    orderDown(event: MouseEvent, group: IGroup) {
        event.preventDefault();
        group.order++;
    }

    /**
     * Переключает схлопнутое состояние у группы
     * @param event событие
     * @param group модель группы
     */
    collapse(event, group) {
        event.preventDefault();
        group.collapsed = !group.collapsed;
    }
}
