export interface TodoSpecs {
    todoText: string;
}

export interface TodoItem extends TodoSpecs {
    checked: boolean;
    id: string;
}