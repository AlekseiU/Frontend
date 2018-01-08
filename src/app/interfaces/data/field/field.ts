/**
 * Интерфейс поля Data объекта
 */

export interface IField {
    id: number;
    type: string;
    value: string[];
    order: number;
    group: number;
    scrap?: any;
}
