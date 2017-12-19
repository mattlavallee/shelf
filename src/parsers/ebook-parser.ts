'use strict';

const fs = require('fs');
import {forEach} from 'lodash';
import {Book} from '../models/book';
import {BookTypes} from '../models/book-types';
import {ebookLocation, tokenizeBookFormat, ebookFormat} from '../configs/file-locations';

export function processEbooks(): Book[] {
  const files = fs.readdirSync(ebookLocation);
  let ebooks: Book[] = [];
  forEach(files, (file) => {
    const tokenizedStats = tokenizeBookFormat(ebookFormat);
    const filePieces: string[] = file.split('.');
    if(tokenizedStats.token === null) {
      ebooks.push(new Book(
        tokenizedStats.author < 0 ? null : filePieces[0],
        tokenizedStats.title < 0 ? null : filePieces[0],
        BookTypes.EBOOK,
        filePieces[1],
      ));
    } else {
      const fileNamePieces: string[] = filePieces[0].split(tokenizedStats.token);
      const authorFirst: boolean = tokenizedStats.author < tokenizedStats.title;
      ebooks.push(new Book(
        authorFirst ? fileNamePieces[0] : fileNamePieces[1],
        authorFirst ? fileNamePieces[1] : fileNamePieces[0],
        BookTypes.EBOOK,
        filePieces[1],
      ));
    }
  });

  return ebooks;
}