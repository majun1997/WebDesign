/**
 * 
 */

'use strict';


const Service = require('../services/service');
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    Service.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new things with the request JSON and
 * returns things JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    const newthings = Object.assign({}, request.body);
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    Service.save(newthings)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a things object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    //console.log(request.params)
    Service.get(request.params.listid)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a things object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const list = Object.assign({}, request.body);
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    list._id = request.params.listid;
    //console.log(list);
    Service.update(list)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (list) => {
        response.status(200);
        response.json({
            message: " Successfully deleted"
        });
    };
    Service.delete(request.params.listid)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};