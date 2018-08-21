const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//partials concept to use common template
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })


app.get('/', (req, res) => {
    res.render("home.hbs", {
        username: "chirag",
        pageTitle: 'Home Title changed'
    })
});

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'About ME'

    })
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(3000, () => {
    console.log("Server has been started on port no 3000")
});