const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var useragent = require('express-useragent');
var mongoose =require('mongoose');
var path = require('path');

let app = express();

//Route file requiring (importing)
var userReqRoute=require("./Routes/userReqRoute");
var driverRoute=require("./Routes/driverRoute");
var driverlocRoute=require("./Routes/driverlocRoute");

//BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true, limit: '150mb'
}));
app.use(bodyParser.json({ limit: '150mb' }));

//DATABASE URL
// 2hy7R2mF5qI5FAUW password
mongoose.connect(process.env.MONGOURL || 'mongodb+srv://hostsampletesting:2hy7R2mF5qI5FAUW@cluster0.ucm4imb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
    console.log("Data Base connected")
}).catch((ex) => {
    console.log("Db connection error")
    console.log(ex)
});

//database connection
var db = mongoose.connection;

// serve the public
app.use(express.static('public'));

//Port Declaration
var port = process.env.PORT || 3000;

//Cors and helmet use
app.use(cors());
app.use(helmet({crossOriginResourcePolicy:false}));
app.use(express.json());

//Consoles the user information and API calls into the server Environment
app.use(useragent.express());
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})

//function usage
app.use(userReqRoute);
app.use(driverRoute);
app.use(driverlocRoute);

//Route for checking the server health
app.get('/health', async(req, res) => {
    res.status(200).json({
        status: true
    });
    return
});

app.get('/server/time',async(req,res)=>{
    console.log("Function /server/time Called.");
    console.log(new Date())
})

//Server Environment set up
const server = app.listen(port, function () {
    console.log("Running Server on port "+port);
});