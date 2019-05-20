
jQuery(function ($) {
	"use strict";

	//client side socket.io
	var socket = io.connect();
	var app = {

		init: function () {
			this.list();
			this.actions();
			this.socketActions();
		},

		persist: function (new_todo) {

			socket.emit('add', new_todo);
		},

		edit: function (edit_todo) {

			socket.emit('edit', edit_todo);
		},

		destroy: function (todo_id) {

			socket.emit('delete', { id: todo_id });
		},

		changeStatus: function (todo_id, todo_status) {

			socket.emit('changestatus', { id: todo_id, status: todo_status });
		},

		allChangeStatus: function (master_status) {

			socket.emit('allchangestatus', { status: master_status });
		},

		actions: function () {
			$('#todo-form').submit(function () {
				if (!$('#new-todo').val()) {
					return false;
				}
				var new_todo = {
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
					var edit_todo = {
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
			socket.on('count', function (data) {
				$('footer#footer').html(data.count + ' users online.');
			});

			socket.on('added', function (data) {
				app.addToList(data);
			});

			socket.on('deleted', function (data) {
				app.destroyOnTodoList(data.id);
			});

			socket.on('statuschanged', function (data) {
				app.markOnTodoList(data.id, data.status);
			});

			socket.on('edited', function (data) {
				$('li#' + data._id + ' .view label').html(data.title);
				$('li#' + data._id + ' input.edit').val(data.title);
			});

			socket.on('allstatuschanged', function (data) {
				app.markAllOnTodoList(data.status);
			});
		},

		list: function () {
			socket.on('all', function (data) {
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
		addToList: function (new_todo) {
			$('#todo-list').append('<li id="' + new_todo._id + '"><div class="view"><input data-todoId="' + new_todo._id + '" class="toggle" type="checkbox"><label>' + new_todo.title + '</label><button data-todoId="' + new_todo._id + '" class="destroy"></button></div><input data-todoId="' + new_todo._id + '" class="edit" value="' + new_todo.title + '"></li>');
			app.mainSectionToggle();
		},
		destroyOnTodoList: function (todo_id) {
			$('li#' + todo_id).remove();
			app.mainSectionToggle();
		},

		markOnTodoList: function (todo_id, todo_status) {
			if (todo_status == 'complete') {
				$('li#' + todo_id).addClass('completed');
				$('li#' + todo_id + ' div.view input.toggle').attr('checked', true);
			} else {
				$('li#' + todo_id).removeClass('completed');
				$('li#' + todo_id + ' div.view input.toggle').attr('checked', false);
			}

			if ($('input#toggle-all').prop('checked')) {
				$('input#toggle-all').attr('checked', false);
			}
		},

		markAllOnTodoList: function (master_status) {
			if (master_status == 'complete') {
				$('ul#todo-list li').addClass('completed');
				$('input.toggle').prop('checked', true);
				$('input#toggle-all').attr('checked', true);
			} else {
				$('ul#todo-list li').removeClass('completed');
				$('input.toggle').prop('checked', false);
				$('input#toggle-all').attr('checked', false);
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

	window.App = app.init();
});


