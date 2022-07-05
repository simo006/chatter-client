# Chatter client app
This project was created for testing purposes. It is **not working properly** and **have some issues**.

## How to start the project locally
* Clone the project in your local folder
* Install all packages with: ```npm install```
* Start the project

## How to start the project
1. Run ```npm install``` to add all libraries.
2. Run ```npm run watch``` to watch for changes in js files and rebuild on save.
3. Click ```Watch Sass``` button to watch for changes in sass files and rebuild on save.

## Project description
This is a simple live chat SPA that manages chat requests between users. It uses Javascript ES6 module architecture. It has a simple router with external library called *Page Router JS*. The following functionality is developed:
* Login
* Register
* Show messages
* Send messages
* Seen chat
* Send online status

## Configure VS Code for better developing
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