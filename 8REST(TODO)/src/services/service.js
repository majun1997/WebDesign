  
/**
 * Service for todo operations.
 */

'use strict';
const mongoose = require('mongoose');

const todo = mongoose.model('todos');

/**
 * Returns an array of todo object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    const promise = todo.find(params).exec();
    return promise;
};

/**
 * Saves and returns the new todo object.
 *
 * @param {Object} todo {todo object}
 */
exports.save = function (add) {
    const newtodo = new todo(add);
    const promise = newtodo.save();
    return promise;
};

/**
 * Returns the todo object matching the id.
 *
 * @param {string} todoId {Id of the todo object}
 */
exports.get = function (todoId) {
    const promise = todo.findById(todoId).exec();
    return promise
};

/**
 * Updates and returns the todo object.
 *
 * @param {Object} todo {todo object}
 */
exports.update = function (update) {
    
    const promise = todo.findOneAndUpdate({_id: update._id}, update).exec();
    return promise;
};

/**
 * Deletes the todo object matching the id.
 *
 * @param {string} todoId {Id of the todo object}
 */
exports.delete = function (todoId) {
    const promise = todo.remove({_id: todoId});
    return promise;
};