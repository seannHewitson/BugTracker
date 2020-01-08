module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    require('colors');

    router.get('/', function(req, res, next){
        res.render('index.ejs', {
            title: "Home",
            version: global.version
        });            
    });

    router.get('/Callback', function(req, res, next){
        res.render('index.ejs', {
            title: "Callback",
            version: global.version
        });      
    });

    router.get('/Logout', function(req, res, next){
        res.render('index.ejs', {
            title: "Logout",
            version: global.version
        });      
    });
    return router;
};