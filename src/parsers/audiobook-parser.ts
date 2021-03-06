'use strict';

const glob = require('glob');
const path = require('path');
import {forEach} from 'lodash';
import {Book} from '../models/book';
import {BookTypes} from '../models/book-types';
import {audiobookLocation, audiobookFormat} from '../configs/file-locations';
import {tokenizeBookFormat} from '../configs/tokenizer';

export function processAudiobooks(): Book[] {
  let regexFormat = audiobookFormat.replace('{author}', '*').replace('{title}', '*');
  const files = glob.sync(audiobookLocation + regexFormat);
  let audiobooks: Book[] = [];
  const tokenizedStats = tokenizeBookFormat(audiobookFormat);
  const format = 'MP3';
  forEach(files, (file) => {
    const sanitizedFile = file.replace(audiobookLocation, '');
    if (tokenizedStats.token === null) {
      audiobooks.push(new Book(
        tokenizedStats.author < 0 ? null : sanitizedFile,
        tokenizedStats.title < 0 ? null : sanitizedFile,
        BookTypes.AUDIOBOOK,
        format,
        path.join(audiobookLocation, file),
      ));
    } else {
      const audioPieces: string[] = sanitizedFile.split(tokenizedStats.token);
      const authorFirst: boolean = tokenizedStats.author < tokenizedStats.title;
      audiobooks.push(new Book(
        authorFirst ? audioPieces[0] : audioPieces[1],
        authorFirst ? audioPieces[1] : audioPieces[0],
        BookTypes.AUDIOBOOK,
        format,
        path.join(audiobookLocation, file),
      ));
    }
  });

  return audiobooks;
}