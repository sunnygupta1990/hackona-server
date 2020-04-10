const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const shopRoutes = require('./api/routes/shops'); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/shops',shopRoutes);
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;