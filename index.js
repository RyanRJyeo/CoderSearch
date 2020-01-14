// Socket io requirements
// ==================================
const http = require("http");
const socketIO = require('socket.io')
// ==================================



// Boilerplate
// ==================================
const express = require('express');
const cookieParser = require('cookie-parser');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.PORT = process.env.PORT || 3000;

const db = require('./db');

const app = express();

// Set up middleware
app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));

app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

require('./routes')(app, db);

// application routes (this goes last)
setupAppRoutes(app);
// ==================================




// Socket io configs
// ==================================
const server = http.createServer(app)
const io = socketIO(server)


io.on('connection', socket => {
    console.log("user connected")


    socket.on('chat updated', (value) => {
        console.log("get socket and emitting")
        io.sockets.emit("chat updated", value);
    })


    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})
// ==================================



server.listen(process.env.PORT, () => {
  console.log(`HTTP server is now running on http://localhost:${process.env.PORT}`);
});