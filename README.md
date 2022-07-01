# Chatter client project

## Configure VS Code
1. Add these lines to **settings.json** file in VS Code. To open it type ```F1``` and then type ```settings.json```.
```javascript
"liveSassCompile.settings.excludeList": [
    "**/node_modules/**",
    ".vscode/**"
],
"liveSassCompile.settings.formats": [
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/dist/css"
    }
]
```

2. Add these **extensions** to VS Code.
* Add jsdoc comments - *stevencl*
* lit-html - *Matt Bierner*
* Live Sass Compiler - *Ritwick Dey*
* Sass - *Syler*
* ESLint - *Microsoft*

## Before start working
1. Run ```npm install``` to add all libraries.

2. Run ```npm run watch``` to watch for changes in js files and rebuild on save.

3. Click ```Watch Sass``` button to watch for changes in sass files and rebuild on save.