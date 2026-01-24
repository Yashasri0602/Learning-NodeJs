const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./02-Express-JS/config/corsOptions')
const path = require('path');
const { logEvents }= require('./02-Express-JS/middleware/logEvents');
const errorHandler = require('./02-Express-JS/middleware/errorHandler');
const { logger } = require('./02-Express-JS/middleware/logEvents');
const PORT = process.env.PORT || 3500;

//custom middleware logger
//this while one way to do it 
app.use((req,res,next) => {
    logEvents(`${req.method} \t ${req.headers.origin} \t ${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
}) 

//this is another way to write custom middleware 

app.use(logger)


app.use(cors(corsOptions))

//the below middleware is to accept form data
app.use(express.urlencoded({ extended: false}))
//this is for json data, It is a built in middleware
app.use(express.json())

//to tell it to use css files and other files in the public folder, If any request asks for 
//a file it will first check the public file and if it exists it gives the file or else continues with the routes
app.use(express.static(path.join(__dirname,'02-Express-JS','/public')))
app.use('/subdir',express.static(path.join(__dirname,'02-Express-JS','/public')))

app.use('/subdir', require('./02-Express-JS/routes/subdir'))
app.use('/', require('./02-Express-JS/routes/root'))
app.use('/employees', require('./02-Express-JS/routes/api/employees'))

//this is the default route anything after / without route is gonna come here 
// .all applies to all the requests where as .use for middleware
app.all(/(.*)/ , (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, '01-custom-web-server', 'views', '404.html'));
    }
    else if (req.accepts('json')){
        res.json({error : "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found")
    } 

})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})