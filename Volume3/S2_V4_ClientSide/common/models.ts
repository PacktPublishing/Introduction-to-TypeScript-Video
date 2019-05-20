/**
 * Todo model
 */
export interface Todo {
    _id?: string;
    id?: string;
    title: string;
    complete?: boolean;
}

/**
 * Delete todo command
 */
export interface DeleteTodoCommand {
    id: string;
}

export const TodoStatusComplete = 'complete';
export const TodoStatusIncomplete = 'incomplete';

/**
 * Available todo statuses that can be set
 */
export type TodoStatus = typeof TodoStatusComplete | typeof TodoStatusIncomplete;

/**
 * Change todo status command
 */
export interface ChangeTodoStatusCommand {
    id?: string;
    status: TodoStatus;
}