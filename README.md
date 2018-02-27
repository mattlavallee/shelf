# shelf
Simple web app to organize and search local collection of ebooks and audiobooks

### Install

```
npm install

## or

yarn
```

### Usage

```
npm run build
```

To build just server code
```
npm run build-server
```

To build just front-end code
```
npm run build-app
```

To run app
```
npm run start
```

### Details
The app looks for a "Books" directory two folders up. This can easily be change in `/src/configs/file-locations.ts`.
Please note that if you update the file locations you must rebuild the app.

By default, audiobooks are expected to be in the format `/Author/Title/<files>` and ebooks are expected to be in the format `author_title.format`.
Similar to location, this can be changed in `/src/configs/tokenizer.ts` but the app must be rebuilt afterwards
