'use strict';

import * as express from 'express';
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const zip = require('express-easy-zip');
const path = require('path');
import {Base64} from 'js-base64';

import {Book} from './models/book';

import {processEbooks} from './parsers/ebook-parser';
import {processAudiobooks} from './parsers/audiobook-parser';

var app = express();
app.use(zip());

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
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
  const ebooks: Book[] = processEbooks();
  const audiobooks: Book[] = processAudiobooks();
  res.render('index', {books: JSON.stringify(ebooks.concat(audiobooks))});
});

app.get('/download/:file', function(req, res) {
  if (!req.params.file) {
    res.status(404);
    res.send();
  }

  const filePath = Base64.decode(req.params.file);
  const fileName = Base64.decode(req.query.name) || 'Download 1';
  (<any>res).zip({
    files: [
      { path: path.join(__dirname, '..', filePath), name: fileName }
    ],
    filename: fileName.split('.')[0] + '.zip',
  });
});

app.listen(8000, () => console.log('App listening on port 8000!'))