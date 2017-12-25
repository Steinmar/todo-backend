const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const api = require('./routes/api.route');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
    useMongoClient: true
}).then(() => {
    console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`)
}).catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp`)
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
