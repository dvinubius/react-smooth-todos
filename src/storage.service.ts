import { TodoItem } from './TodoItem.model';
export class StorageService {
    static getStoredTodos() : TodoItem[] {
        const serialized = this._getTodos();
        const todos = serialized != null ? JSON.parse(serialized) : [];
        return todos;
    }

    static addTodo(item: TodoItem) {
        const serialized = this._getTodos();
        if (!serialized) {
            this._setAsTodos(JSON.stringify([item]));
            return;
        }
        this._setAsTodos(JSON.stringify(JSON.parse(serialized).concat([item])));
    }

    static updateTodo(item: TodoItem) {
        const serialized = this._getTodos();
        if (!serialized) {
            return;
        }
        const parsed: TodoItem[] = JSON.parse(serialized);
        const index = parsed.findIndex(el => el.id === item.id);
        parsed[index] = item;
        this._setAsTodos(JSON.stringify(parsed));
    }

    static deleteTodo(id: string) {
        const serialized = this._getTodos();
        if (!serialized) {
            return;
        }
        const parsed: TodoItem[] = JSON.parse(serialized);
        const result = parsed.filter(el => el.id !== id);
        this._setAsTodos(JSON.stringify(result));
    }

    private static _getTodos() {
        return localStorage.getItem('SmoothTodos');
    }

    private static _setAsTodos(value: string) {
        localStorage.setItem('SmoothTodos', value);
    }
}