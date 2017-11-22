'use strict';

import * as express from 'express';
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const path = require('path');

var app = express();

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, '../dist')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '../bower_components')));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(8000, () => console.log('Example app listening on port 8000!'))