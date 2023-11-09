//Node modules to *require*
//if these cause errors, be sure you've installed them, ex: 'npm install express'
const path = require('path');
const express = require('express');
const app = express();


//specify that we want to run our website on 'http://localhost:8000/'
const host = 'localhost';
const port = 8000;

var publicPath = path.join(__dirname, 'public'); //get the path to use our "public" folder where we stored our html, css, images, etc
app.use(express.static(publicPath));  //tell express to use that folder



//here's where we specify what to send to users that connect to our web server...
//if there's no url extension, it will show "index.html"
app.get('/', function (req, res) {
    res.sendFile(publicPath + '/');
});

//depending on what url extension the user navigates to, send them the respective html file. 
/* // this example app has no additional pages besides the index, so I've commented these out for now.
app.get('/a', function (req, res) {
    res.sendFile(publicPath + '/a.html');
});
*/


//run this server by entering "node App.js" using your command line. 
app.listen(port, () => {
     console.log(`Server is running on http://${host}:${port}`);
   });

