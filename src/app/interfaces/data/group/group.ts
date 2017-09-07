// Interfaces
import { IField } from '../field/field';

/**
 * Интерфейс группы полей Data объекта
 */

export interface IGroup {
    id: number;
    name: string;
    order: number;
    data: number;
    collapsed: boolean;
    fields: IField[];
}
