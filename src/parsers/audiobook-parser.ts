'use strict';

const glob = require('glob');
import {forEach} from 'lodash';
import {Book} from '../models/book';
import {BookTypes} from '../models/book-types';
import {audiobookLocation, tokenizeBookFormat, audiobookFormat} from '../configs/file-locations';

export function processAudiobooks(): Book[] {
  let regexFormat = audiobookFormat.replace('{author}', '*').replace('{title}', '*');
  const files = glob.sync(audiobookLocation + regexFormat);
  let audiobooks: Book[] = [];
  const tokenizedStats = tokenizeBookFormat(audiobookFormat);
  const format = '.mp3';
  forEach(files, (file) => {
    const sanitizedFile = file.replace(audiobookLocation, '');
    if (tokenizedStats.token === null) {
      audiobooks.push(new Book(
        tokenizedStats.author < 0 ? null : sanitizedFile,
        tokenizedStats.title < 0 ? null : sanitizedFile,
        BookTypes.AUDIOBOOK,
        format,
      ));
    } else {
      const audioPieces: string[] = sanitizedFile.split(tokenizedStats.token);
      const authorFirst: boolean = tokenizedStats.author < tokenizedStats.title;
      audiobooks.push(new Book(
        authorFirst ? audioPieces[0] : audioPieces[1],
        authorFirst ? audioPieces[1] : audioPieces[0],
        BookTypes.AUDIOBOOK,
        format,
      ));
    }
  });

  return audiobooks;
}