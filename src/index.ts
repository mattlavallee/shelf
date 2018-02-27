'use strict';

import * as express from 'express';
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const zip = require('express-easy-zip');
const path = require('path');
import {Base64} from 'js-base64';
import {default as apiKey} from './configs/api-key';

import {Book} from './models/book';

import {processEbooks} from './parsers/ebook-parser';
import {processAudiobooks} from './parsers/audiobook-parser';

import axios from 'axios';
const XmlReader = require('xml-reader');
const xmlQuery = require('xml-query');

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

app.get('/book-details/:title/:author', function(req, res) {
  const title = Base64.decode(req.params.title).replace('Book 1', '')
    .replace('Book 2', '').replace('Book 3', '');
  const author = Base64.decode(req.params.author);
  axios.get('https://www.goodreads.com/book/title.xml?author=' + author + 
  '&key=' + apiKey + '&title=' + title).then((result) => {
    res.status(200);
    const ast = XmlReader.parseSync(result.data);
    const queryObj = xmlQuery(ast);
    const description = queryObj.find('description').text();
    const imgUrl = queryObj.find('image_url').first().text();
    res.send({
      description,
      imgUrl,
    });
  }, () => {
    res.status(200);
    res.send({
      description: 'Error: no details found'
    });
  });
});

app.listen(8000, () => console.log('App listening on port 8000!'))