'use strict';
module.exports = function (app) {
    
    //Initialize models
    let Model = require('./models/TodoList');

    //Initialize routes
    let Routes = require('./routes/route');
    Routes(app);
};