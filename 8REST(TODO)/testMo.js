var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://majun1997:majun97MAjun@junma-kvvlv.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});

let a=require("./src/models/TodoList");
var collectionName = 'todo'
const todo = mongoose.model('todo',collectionName);
let promise=todo.find().exec()
promise.then(function(doc){
    console.log(doc);
})



