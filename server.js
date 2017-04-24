const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./app/routes/Todo');

//mongo congiguration 
mongoose.connect('mongodb://localhost/todo',function(err){

	console.log('mongo connected');
});
mongoose.connection.on('error',function(){
	console.log('Check mongo connecttion');
});
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// serve static assets normally
app.use(express.static(__dirname + '/public'))

app.use('/api',Todo);
// Handles all routes so you do not get a not found error
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)