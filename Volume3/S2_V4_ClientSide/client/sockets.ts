import * as SocketEvents from '../common/events'
import * as Models from '../common/models'

/**
 * Client-side Socket.IO Socket emitter
 */
export interface AppClientSocket extends SocketIOClient.Socket {

    // "Override" usage of original emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.ADD, todo: Models.Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.EDIT, todo: Models.Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.DELETE, todo: Models.DeleteTodoCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.CHANGESTATUS, todo: Models.ChangeTodoStatusCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.ALLCHANGESTATUS, todo: Models.ChangeTodoStatusCommand): SocketIOClient.Socket;

    // "Override" usage of original on to allow whitelisting events
    on(event: never, fn: Function): SocketIOClient.Socket;  
    on(event: typeof SocketEvents.COUNT, fn: (data: { count: number }) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.ALL, fn: (data: Models.Todo[]) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.ADDED, fn: (data: Models.Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.EDITED, fn: (data: Models.Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.DELETED, fn: (data: Models.DeleteTodoCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.STATUSCHANGED, fn: (data: Models.ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.ALLSTATUSCHANGED, fn: (data: Models.ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
}