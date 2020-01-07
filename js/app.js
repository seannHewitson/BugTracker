//  Dependencies
// var io = require('socket.io').listen(server);
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
// var logger = require('morgan');
var https = require('https');
var path = require('path');
var fs = require('fs');
var app = express();
require('colors');

//  Globals.
global.version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
global.root_path = path.resolve(__dirname + "/../");
global.port = 443;   // For HTTPS

console.log('Launching BugTracker '.cyan + `v${global.version}`.yellow);

//  Declare publicly accessable folders
app.use('/js', express.static(path.resolve(global.root_path + '/js/client')));
app.use('/css', express.static(path.resolve(global.root_path + '/css')));

// Set favicon
// app.use(favicon('favicon.ico'))
// Set App Properties
app.set('views', path.resolve(global.root_path + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 's3cr3t',
   resave: true,
   saveUninitialized: true
 }));
//  app.use(passport.initialize());
//  app.use(passport.session());

app.use('/', require('../routes/index')());
app.use('/Login', require('../routes/Login')());

// Error Handling
app.use(function(req, res, next){   // 404 not found error
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
 });
 
 // Actual error handler
 app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs', {title: "Error", error: err});
 });
 

 app.set('port', process.env.PORT == null ? global.port : process.env.PORT);
 
//  Create Server
 var server = https.createServer({
   key: fs.readFileSync(__dirname + '/../ssl/client-key.pem'),
   cert: fs.readFileSync(__dirname + '/../ssl/client-cert.pem')
 }, app);

 server.listen(port);

 server.on('error', function(error){
    if(error.syscall !== 'listen')
    throw error;

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch(error.code){
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
 });

 server.on('listening', function(){
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Server Listening on ' + bind);
 });
 