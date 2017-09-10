const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');


//Mongoose Declaretion
mongoose.connect(config.database);

//Mongoose on Connected
mongoose.connection.on('connected', () => {
    console.log('Connected to the database...!!!!' + config.database);
});

//Mongoose on error
mongoose.connection.on('error', (err) => {
    console.log('ERROR in database...!!!!' + err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//Core Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, "Public")));

//Body Parser Middleware
app.use(bodyParser.json());

//Pospost Middleware 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', function(req, res) {
    res.send("Hello Word!!!");
});

//Start Server
app.listen(port, function() {
    console.log('Server is working fine...' + port);
});