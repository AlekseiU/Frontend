import { Component, OnInit, Input } from '@angular/core';
// Services
import { FieldService } from '../../../services/data/field/field.service';
// Components
import { DataComponent } from '../../../components/data/data.component';
// Interfaces
import { IField } from '../../../interfaces/data/field/field';
import { IGroup } from '../../../interfaces/data/group/group';
import { IData } from '../../../interfaces/data/data';

@Component({
  selector: 'data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.styl'],
  providers: [
      FieldService
  ]
})
export class DataFieldComponent {
    @Input() field: IField;
    @Input() group: IGroup;
    @Input() data: DataComponent;

    constructor(
        private fieldService: FieldService
    ) {}

    /**
     * Удаляет поле
     * @param field модель поля
     */
    delete(field: IField) {
        this.fieldService.delete(field.id)
            .subscribe((response) => {
                const groupIndex = this.data.content.indexOf(this.group);
                const fieldIndex = this.data.content[groupIndex].fields.indexOf(field);

                this.data.content[groupIndex].fields.splice(fieldIndex, 1);
            });
    }

    /**
     * Передвигает поле в группе вверх
     * @param field модель поля
     */
    orderUp(field: IField) {
        this.field.order--;
    }

    /**
     * Передвигает поле в группе вниз
     * @param field модель поля
     */
    orderDown(field: IField) {
        this.field.order++;
    }

    upload(field, event) {
        console.log(field, event);
        field.value = event.target.value;
    }

    customTrackBy(index: number, obj: any): any {
        return  index;
    }
}
