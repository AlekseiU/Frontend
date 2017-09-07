/**
 * Интерфейс ответа сервера
 */
export interface IResponse {
    result: boolean;
    message: string;
    data: object;
}
