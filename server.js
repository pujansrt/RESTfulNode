const mongoose = require('mongoose');

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) { // Project utilizes ES6 features: https://node.green
  console.log('older version of node');
  process.exit();
}

require('dotenv').config({ path: 'variables.env' });

// Singleton DB Connection
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});


require('./models/Student');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');
var cors = require('cors')

const app = express();
app.use(cors())


app.set('views', path.join(__dirname, 'dist'));
//app.set('view engine', 'pug'); //pug engine also enables mustache or EJS
app.use(express.static(path.join(__dirname, 'dist')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes); // entry point for controllers
app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);/* Development Prints stack trace */
}
// production error handler
app.use(errorHandlers.productionErrors);
module.exports = app;

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on  port ${server.address().port}`);
});


