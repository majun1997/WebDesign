/**
 * endpoint route definitions.
 */

'use strict';
let fs=require('fs')

module.exports = function (app) {
    const controller = require('../controllers/controller');
    //  Routes for search and create.
    app.route('/')
        .get(function (req, res) {
            fs.readFile("./html/home.html",function (err,data){
                if(err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }else{
                    res.writeHead(200)
                    res.end(data)
                }
            })
            
        });
     app.route('/list')
        .get(controller.list)
        .post(controller.post)
         

    // // Routes for get, update and delete.
    app.route('/list/:listid')
        .get(controller.get)
        .put(controller.put)
        .delete(controller.delete);
};