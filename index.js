let express = require('express');
let path = require('path')
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

function middleware(req, res, next) {
    const info = req.method + " " + req.path + " -" + req.ip;
    console.log(info);
    next();
};

// body-parser to parse data coming from POST requests
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(middleware)

app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({
            message: "Hello json".toUpperCase()
          });
    }else{
        res.json({
            message: "Hello json"
          });
    }
});

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({
            message: "Hello json".toUpperCase()
        });
    } else {
        res.json({
            message: "Hello json"
        });
    }
});

// chain middleware & create time server
app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({ time: req.time })
});

// echo server
app.get('/:word/echo', function(req, res, next) {
    let repeat = req.params.word;
    res.json({ echo: repeat});
    next();
});

// get query parameter input from client
app.get('/name', function(req, res) {
    console.log('Dis: ', req.query)
    const {first: fname, last: lname} = req.query;
    res.json({ name: `${fname} ${lname}`});
})

// get data from post requests
app.post('/name', function(req, res) {
    const {first: fname, last: lname} = req.body;
    res.json({ name: `${fname} ${lname}`});
})

 module.exports = app;
