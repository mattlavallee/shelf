'use strict';

export const ebookLocation: string = '../../Books/ebooks/';
export const ebookFormat: string = '{author}_{title}';

export const audiobookLocation: string = '../../../Books/audiobooks/';
export const audiobookFormat: string = '{author}/{title}/*';

const tokens: {[key:string]: any} = {
  author: {
    token: '{author}',
    length: 8,
  },
  title: {
    token: '{title}',
    length: 7,
  },
};

export class FileTokens {
  public author: number;
  public title: number;
  public token: string|null;

  constructor(authorIndex: number, titleIndex: number, splitToken: string|null) {
    this.author = authorIndex;
    this.title = titleIndex;
    this.token = splitToken;
  }
};

export function tokenizeBookFormat(bookFormat: string): FileTokens {
  const authorStart: number = bookFormat.indexOf(tokens.author.token);
  const titleStart: number = bookFormat.indexOf(tokens.title.token);
  let token: string|null = null;
  if (authorStart < 0 && titleStart < 0) {
    throw new Error('Invalid ebook format');
  } else if (authorStart >= 0 && titleStart >= 0) {
    let tokenStart: number = authorStart + tokens.author.length;
    let tokenEnd: number = titleStart;
    if (titleStart < authorStart) {
      tokenStart = titleStart + tokens.title.length;
      tokenEnd = authorStart;
    }

    token = bookFormat.substring(tokenStart, tokenEnd);
  }

  return new FileTokens(authorStart, titleStart, token);
};