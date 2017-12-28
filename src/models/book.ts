'use strict';

import {BookTypes} from './book-types';
import {uniqueId} from 'lodash';

export class Book {
  public id: string;
  public author: string;
  public title: string;
  public type: BookTypes;
  public format: string;

  constructor(parsedAuthor: string|null, parsedTitle: string|null, 
              type: BookTypes, parsedFormat: string) {
    this.id = uniqueId();
    this.author = parsedAuthor === null ? 'Unkown' : parsedAuthor;
    this.title = parsedTitle === null ? 'Unknown' : parsedTitle;
    this.type = type;
    this.format = parsedFormat;
  }
};