/**
 * reference: Teacher
 */
let express = require('express'),
    app = express(),
    port = process.env.PORT || 4200,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
// use online mongodb with my account
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});
mongoose.Promise = global.Promise;

app.use(express.static(__dirname));//use dir
//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', __dirname +'/html');
app.set('view engine', 'ejs');
//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Initialize app
let initApp = require('./src/app');
initApp(app);

app.listen(port);
console.log('Todo server started on: ' + port);