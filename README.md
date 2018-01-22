# Test Chrome Extension

## Dependencies
Tools needed to run this app:
* `node lts` and `npm`

## Installing
* `npm install -g @angular/cli`

Please check this article if you get PERMISSION error
https://docs.npmjs.com/getting-started/fixing-npm-permissions


* `clone` this repo
* `npm install` to install dependencies

## Build

Run `ng build --prod --aot` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Install into Chrome

   1. Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox: The menu's icon is three horizontal bars. and select Extensions under the More Tools menu to get to the same place).

   2. Ensure that the Developer mode checkbox in the top right-hand corner is checked.

   3. Click Load unpacked extension… to pop up a file-selection dialog.

   4. Navigate to the `dist` directory, and select it.


https://developer.chrome.com/extensions/getstarted#unpacked
