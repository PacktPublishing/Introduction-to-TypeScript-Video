export interface Todo {
    id: string;
    title: string;
    complete: boolean;
}

export const TodoStatusComplete = 'complete';

export interface ChangeTodoStatusCommand {
    id: string;
    status: typeof TodoStatusComplete;
}

export interface DeleteTodoCommand {
    id: string;
}