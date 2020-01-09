module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    require('colors');
    var bugs = [];
    var types = ["Bug", "Change"];
    var priorities = ["Low", "Medium", "High"];
    var statuses = ["Raised", "In Progress", "Testing", "Completed"];
    for(var i = 1; i <= 10; i++){
        bugs.push({
            ID: i,
            description: `Bug ${i} Description`,
            page: `Bug ${i} Page`,
            component: `Bug ${i} Component`,
            type: types[Math.floor(Math.random()*types.length)],
            priority: priorities[Math.floor(Math.random()*priorities.length)],
            status: statuses[Math.floor(Math.random()*statuses.length)],
        });
    }
    router.get('/', function(req, res, next){
        res.render('Test.ejs', {
            title: "Test Page",
            version: global.version,
            project: 'Test Project',
            bugs: bugs
        });            
    });

    return router;
};