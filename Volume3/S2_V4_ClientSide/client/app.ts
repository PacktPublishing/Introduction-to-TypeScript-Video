import { AppClientSocket } from './sockets'
import * as SocketEvents from '../common/events';
import * as Models from '../common/models'

jQuery(function ($: JQueryStatic) {
	"use strict";

	//client side socket.io
	var socket = <AppClientSocket>io.connect();
	var app = {

		init: function () {
			this.list();
			this.actions();
			this.socketActions();
		},

		persist: function (new_todo: Models.Todo) {

			socket.emit(SocketEvents.ADD, new_todo);
		},

		edit: function (edit_todo: Models.Todo) {

			socket.emit(SocketEvents.EDIT, edit_todo);
		},

		destroy: function (todo_id: string) {

			socket.emit(SocketEvents.DELETE, { id: todo_id });
		},

		changeStatus: function (todo_id: string, todo_status: Models.TodoStatus) {

			socket.emit(SocketEvents.CHANGESTATUS, { id: todo_id, status: todo_status });
		},

		allChangeStatus: function (master_status: Models.TodoStatus) {

			socket.emit(SocketEvents.ALLCHANGESTATUS, { status: master_status });
		},

		actions: function () {
			$('#todo-form').submit(function () {
				if (!$('#new-todo').val()) {
					return false;
				}
				var new_todo: Models.Todo = {
					title: $('#new-todo').val(),
					complete: false
				}
				$('#new-todo').val('');
				app.persist(new_todo);

				return false;
			});

			$('#todo-list').on('click', 'button.destroy', function (e) {
				e.preventDefault();
				app.destroy($(this).attr('data-todoId'));
			});

			$('#todo-list').on('change', 'input.toggle', function () {
				if ($(this).prop('checked')) {
					app.changeStatus($(this).attr('data-todoId'), 'complete');
				} else {
					app.changeStatus($(this).attr('data-todoId'), 'incomplete');
				}

			});

			$('input#toggle-all').on('click', function () {
				if ($(this).prop('checked')) {
					app.allChangeStatus('complete');
				} else {
					app.allChangeStatus('incomplete');
				}
			});

			$('#todo-list').on('dblclick', 'li', function () {
				$(this).addClass('editing');
				$(this).children('input.edit').focus();
			});

			$('#todo-list').on('focusout', 'input.edit', function () {

				if (!$(this).val()) {
					app.destroy($(this).attr('data-todoId'));
				} else {
					$('li#' + $(this).attr('data-todoId') + ' .view label').html($(this).val());
					var edit_todo: Models.Todo = {
						title: $(this).val(),
						id: $(this).attr('data-todoId')
					}

					app.edit(edit_todo);
					$(this).parent().removeClass('editing');

				}

			});

			$('#todo-list').on('keypress', 'input.edit', function (e) {
				if (e.which == 13) {
					if (!$(this).val()) {
						app.destroy($(this).attr('data-todoId'));
					} else {
						$('li#' + $(this).attr('data-todoId') + ' .view label').html($(this).val());
						var edit_todo = {
							title: $(this).val(),
							id: $(this).attr('data-todoId')
						}
						app.edit(edit_todo);
						$(this).parent().removeClass('editing');

					}
				}
			});


		},

		socketActions: function () {
			socket.on(SocketEvents.COUNT, function (data: { count: number }) {
				$('footer#footer').html(data.count + ' users online.');
			});

			socket.on(SocketEvents.ADDED, function (data: Models.Todo) {
				app.addToList(data);
			});

			socket.on(SocketEvents.DELETED, function (data: Models.DeleteTodoCommand) {
				app.destroyOnTodoList(data.id);
			});

			socket.on(SocketEvents.STATUSCHANGED, function (data: Models.ChangeTodoStatusCommand) {
				if (typeof data.id !== 'undefined') {
					app.markOnTodoList(data.id, data.status);
				}
			});

			socket.on(SocketEvents.EDITED, function (data: Models.Todo) {
				$('li#' + data._id + ' .view label').html(data.title);
				$('li#' + data._id + ' input.edit').val(data.title);
			});

			socket.on(SocketEvents.ALLSTATUSCHANGED, function (data: Models.ChangeTodoStatusCommand) {
				app.markAllOnTodoList(data.status);
			});
		},

		list: function () {
			socket.on(SocketEvents.ALL, function (data: Models.Todo[]) {
				$('#todo-list').html('');
				for (var i = 0; i < data.length; i++) {
					if (data[i].complete) {
						$('#todo-list').append('<li id="' + data[i]._id + '" class="completed"><div class="view"><input data-todoId="' + data[i]._id + '" class="toggle" type="checkbox" checked><label>' + data[i].title + '</label><button data-todoId="' + data[i]._id + '" class="destroy"></button></div><input data-todoId="' + data[i]._id + '" class="edit" value="' + data[i].title + '"></li>');
					} else {
						$('#todo-list').append('<li id="' + data[i]._id + '"><div class="view"><input data-todoId="' + data[i]._id + '" class="toggle" type="checkbox"><label>' + data[i].title + '</label><button data-todoId="' + data[i]._id + '" class="destroy"></button></div><input data-todoId="' + data[i]._id + '" class="edit" value="' + data[i].title + '"></li>');
					}
				}
				app.mainSectionToggle();
			});

		},
		addToList: function (new_todo: Models.Todo) {
			$('#todo-list').append('<li id="' + new_todo._id + '"><div class="view"><input data-todoId="' + new_todo._id + '" class="toggle" type="checkbox"><label>' + new_todo.title + '</label><button data-todoId="' + new_todo._id + '" class="destroy"></button></div><input data-todoId="' + new_todo._id + '" class="edit" value="' + new_todo.title + '"></li>');
			app.mainSectionToggle();
		},
		destroyOnTodoList: function (todo_id: string) {
			$('li#' + todo_id).remove();
			app.mainSectionToggle();
		},

		markOnTodoList: function (todo_id: string, todo_status: Models.TodoStatus) {
			if (todo_status == 'complete') {
				$('li#' + todo_id).addClass('completed');
				$('li#' + todo_id + ' div.view input.toggle').prop('checked', true);
			} else {
				$('li#' + todo_id).removeClass('completed');
				$('li#' + todo_id + ' div.view input.toggle').prop('checked', false);
			}

			if ($('input#toggle-all').prop('checked')) {
				$('input#toggle-all').prop('checked', false);
			}
		},

		markAllOnTodoList: function (master_status: Models.TodoStatus) {
			if (master_status == 'complete') {
				$('ul#todo-list li').addClass('completed');
				$('input.toggle').prop('checked', true);
				$('input#toggle-all').prop('checked', true);
			} else {
				$('ul#todo-list li').removeClass('completed');
				$('input.toggle').prop('checked', false);
				$('input#toggle-all').prop('checked', false);
			}
		},

		mainSectionToggle: function () {
			if (!$('ul#todo-list li').length) {
				$('section#main').hide();
				$('footer#footer').hide();
			} else {
				$('section#main').show();
				$('footer#footer').show();
			}
		}
	};

	(window as any).App = app.init();
});


