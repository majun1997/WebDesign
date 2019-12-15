const express = require('express'),
    app = express(),
    port = 3000 || process.env.PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    routes = require('./routes/appRoutes'),
    cors = require('cors'),
    passport = require('passport'),
    //require db models
    model = require('./model/model');

//db config
mongoose.connect('mongodb+srv://groupK:FinalProjectK@cluster0-cn5uq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.Promise = global.Promise;
//app config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());
//register routes
routes(app);

app.listen(port, () => console.log(`Server listening on port 3000!`));