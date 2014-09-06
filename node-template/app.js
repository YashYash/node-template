var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var fs = require("fs");
var testapi = require('./api/testapi');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var holla = require('holla');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//socket.io code
server.listen(3000);
io.sockets.on('connection', function(socket){
    console.log("socket.io is working"); 

});


// view engine setup
// app.set('port', process.env.PORT || 3000)
mongoose.set('debug', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'my secret', 
                 saveUninitialized: true,
                 resave: true,
                 cookie: { maxAge: 6000000 }
                }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/// Routes ///
app.use('/', routes);

/// Apis ///
app.use('/api/', testapi);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//mongoose
mongoose.connect('mongodb://localhost:27017/node-template');

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express sever listening on port ' + app.get('port'));
// })


module.exports = app;
