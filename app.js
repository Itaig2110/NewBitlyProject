const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const LinkRouter = require('./router/linkRouter');
const app = express();

const mongoUrl = "mongodb+srv://yaron123:Itaig2110@cluster0.stgbl.mongodb.net/school";

mongoose.connect(mongoUrl).then(() => console.log('Connected To DataBase'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/link',LinkRouter);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});



app.use((req,res)=>{
    res.status(404).send("Page Not Found ! ");
});
module.exports = app;
