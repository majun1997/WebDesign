'use strict';
const Service = require('../services/artwork-service');
const fileservice=require('./file-controller.js');
const memberService = require('../services/member-services');
exports.list = (request, response) => {
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    Service.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
}
exports.delete=(request,response)=>
{
    const delthings = Object.assign({}, request.body);
    console.log(delthings.artworkdetail)
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    console.log(delthings)
    if(delthings.artworkdetail.artworktype==='input-photo')
        fileservice.delete(delthings.artworkdetail.url.replace("http://localhost:3000/","./"))

    Service.delete(request.params.id)
        .then(resolve)            
        .catch(renderErrorResponse(response));
}
/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.findbyauth=(request,response)=>{
    console.log(`{"auth":"${request.params.id}"}`)
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    Service.search({auth:request.params.id})
        .then(resolve)
        .catch(renderErrorResponse(response));
}
/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.get = function (request, response) {
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    //console.log(request.params)
    Service.get(request.params.id)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.create= function(request,response){
    
    const newthings = Object.assign({}, request.body);
    
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    
    Service.create(newthings)
        .then(resolve)
        .catch(renderErrorResponse(response));
}


/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
exports.publishArtwork = (req, res) => {
    const newArtwork = Object.assign({}, req.body);
    const resolve = () => {        
        res.status(200);
        res.json({"msg": "OK"});
    };
    Service.newArtwork(newArtwork, req._id)
        .then(resolve)
        .catch(renderErrorResponse(res));
} 

exports.artwork_update = (req, res) => {
    const newthings = Object.assign({}, req.body);
    console.log(newthings)
    const resolve = () => {
      res.status(200);
      res.json({ "msg": 'OK'});
    };
    Service.update({_id: newthings._id}, newthings)
      .then(resolve)
      .catch(renderErrorResponse(res));
  }

/**
 *
 *
 * @param {*} res
 * @returns
 */
let renderErrorResponse = (res) => {
    const errorCallback = (error) => {
        if (error) {
            res.status(500);
            res.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};