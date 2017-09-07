// Interfaces
import { IGroup } from './group/group';

/**
 * Интерфейс Data объекта
 */
export interface IData {
    id: number;
    name: string;
    coordinates: {
        x: number,
        y: number
    };
    fullScreen: boolean;
    project: number;
    parent: number;
    content: IGroup[];
}
